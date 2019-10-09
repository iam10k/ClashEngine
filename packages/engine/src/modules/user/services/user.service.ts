import { User, UserCore, UserCreate, UserDetail, UserFindOptions, UserPagedResponse, UserUpdate } from '@clash/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { subDays } from 'date-fns';
import { Repository } from 'typeorm';
import { API_ERROR } from '../../../constants';
import { API_CONST } from '../../../constants/api.constant';
import { DataConstraintException } from '../../../core/exceptions';
import { SqlUtil } from '../../../utils';
import { UserCoreEntity } from '../core';
import { UserDetailEntity, UsernameHistoryEntity } from '../entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserDetailEntity) private readonly userRepository: Repository<UserDetailEntity>,
    @InjectRepository(UsernameHistoryEntity) private readonly usernameRepository: Repository<UsernameHistoryEntity>
  ) {}

  async findUsers(findOptions: UserFindOptions): Promise<UserPagedResponse> {
    const query = this.userRepository.createQueryBuilder('user');

    let hasWhere: boolean = false;
    if (findOptions.q) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'LOWER(user.username) LIKE :text', {
        text: `%${findOptions.q.toLowerCase()}%`
      });
    }
    if (findOptions.discordId) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'user.discordId = :discordId', { discordId: findOptions.discordId });
    }

    const [userEntities, count]: [UserCoreEntity[], number] = await query
      .skip(findOptions.skip)
      .take(findOptions.take)
      .orderBy('user.username', findOptions.order)
      .getManyAndCount();

    return new UserPagedResponse(
      plainToClass(UserCore, userEntities, { excludeExtraneousValues: true }),
      count,
      findOptions
    );
  }

  async getCurrentUser(): Promise<UserDetail> {
    // TODO
    return null;
  }

  async getUserById(id: number): Promise<User> {
    const userEntity: UserDetailEntity = await this.userRepository.findOne(id);
    return plainToClass(User, userEntity, { excludeExtraneousValues: true });
  }

  async getUserDetailById(id: number): Promise<UserDetail> {
    const userEntity: UserDetailEntity = await this.userRepository.findOne(id);
    return plainToClass(UserDetail, userEntity, { excludeExtraneousValues: true });
  }

  async getUserDetailByDiscord(discordId: string): Promise<UserDetail> {
    const userEntity: UserDetailEntity = await this.userRepository.findOne({
      where: {
        discordId
      }
    });
    return plainToClass(UserDetail, userEntity, { excludeExtraneousValues: true });
  }

  async addUser(discordId: string, userCreate: UserCreate): Promise<UserDetail> {
    const userEntity: UserDetailEntity = await this.userRepository.save(
      plainToClass(UserDetailEntity, {
        ...userCreate,
        discordId
      })
    );
    return plainToClass(UserDetail, userEntity, { excludeExtraneousValues: true });
  }

  async updateUser(userId: number, userUpdate: UserUpdate): Promise<UserDetail> {
    const newUsername: string = userUpdate.username;

    if (newUsername) {
      const userEntity: UserDetailEntity = await this.updateUsername(userId, newUsername);
      if (userEntity) {
        await this.addUsernameHistory(userId, userEntity.username, newUsername);
      }
    }

    const updatedEntity: UserDetailEntity = await this.userRepository.save(
      plainToClass(UserDetailEntity, {
        email: userUpdate.email,
        username: newUsername,
        id: userId
      })
    );
    return plainToClass(UserDetail, updatedEntity, { excludeExtraneousValues: true });
  }

  private async updateUsername(userId: number, newUsername: string): Promise<UserDetailEntity> {
    const lowerUsername: string = newUsername.toLowerCase();

    // Find user and any users matching the new username
    const userEntities: UserDetailEntity[] = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :userId', { userId })
      .orWhere('LOWER(user.username) = :username', { username: lowerUsername })
      .getMany();

    const currentUser: UserDetailEntity = userEntities.find(user => user.id === userId);
    if (!currentUser) {
      throw new NotFoundException();
    }

    if (userEntities.length > 1) {
      throw new DataConstraintException(API_ERROR.USER.UNIQUE.USERNAME);
    }

    // Return user if username is being changed
    if (currentUser.username && currentUser.username.toLowerCase() !== lowerUsername) {
      return currentUser;
    }
    return null;
  }

  private async addUsernameHistory(userId: number, previousUsername: string, newUsername: string): Promise<any> {
    const lowerUsername: string = newUsername.toLowerCase();

    // Find any locked username's in the last X days
    const usernameHistoryCount: number = await this.usernameRepository
      .createQueryBuilder('usernameHistory')
      .where('usernameHistory.createdAt >= :since', {
        since: subDays(new Date(), API_CONST.USERNAME.LOCK_PERIOD_DAYS)
      })
      .andWhere('LOWER(usernameHistory.username) = :username', { username: lowerUsername })
      .getCount();

    if (usernameHistoryCount > 0) {
      throw new DataConstraintException(API_ERROR.USER.LOCK.HISTORY);
    }

    return await this.usernameRepository.save(
      plainToClass(UsernameHistoryEntity, {
        username: previousUsername,
        userId
      })
    );
  }
}
