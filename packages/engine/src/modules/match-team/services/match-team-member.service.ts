import { MatchTeamMember } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { MatchTeamMemberEntity } from '../entities';

@Injectable()
export class MatchTeamMemberService {
  constructor(
    @InjectRepository(MatchTeamMemberEntity) private readonly teamMemberRepository: Repository<MatchTeamMemberEntity>
  ) {}

  async findMatchTeamMembers(matchTeamId: number): Promise<MatchTeamMember[]> {
    const teamMemberEntities: MatchTeamMemberEntity[] = await this.teamMemberRepository.find({
      relations: ['user'],
      where: {
        team: matchTeamId
      }
    });
    return plainToClass(MatchTeamMember, teamMemberEntities, { excludeExtraneousValues: true });
  }

  async addMatchTeamMember(matchTeamId: number, userId: number): Promise<MatchTeamMember> {
    const matchTeamEntity: MatchTeamMemberEntity = await this.teamMemberRepository.save({
      user: { id: userId },
      team: { id: matchTeamId }
    });
    return plainToClass(MatchTeamMember, matchTeamEntity, { excludeExtraneousValues: true });
  }

  async addMatchTeamMembers(teamId: number, userIds: number[]): Promise<MatchTeamMember[]> {
    const matchTeamEntity: MatchTeamMemberEntity[] = await this.teamMemberRepository.save(
      userIds.map(userId => {
        return {
          user: { id: userId },
          team: { id: teamId }
        };
      })
    );
    return plainToClass(MatchTeamMember, matchTeamEntity, { excludeExtraneousValues: true });
  }
}
