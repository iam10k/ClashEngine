import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { FindConditions, Repository } from 'typeorm';
import { API_ERROR } from '../../../constants';
import { LockConstraintException } from '../../../core/exceptions';
import { SeasonOptionUpdate } from '../dtos/season-option-update.dto';
import { SeasonOption } from '../dtos/season-option.dto';
import { SeasonEntity, SeasonOptionEntity } from '../entities';

@Injectable()
export class SeasonOptionService {
  constructor(
    @InjectRepository(SeasonOptionEntity) private readonly optionRepository: Repository<SeasonOptionEntity>,
    @InjectRepository(SeasonEntity) private readonly seasonRepository: Repository<SeasonEntity>
  ) {}

  async findSeasonOptions(seasonId: number): Promise<SeasonOption[]> {
    const optionEntities: SeasonOptionEntity[] = await this.optionRepository.find({
      relations: ['configOption'],
      where: {
        season: seasonId
      }
    });
    return plainToClass(SeasonOption, optionEntities, { excludeExtraneousValues: true });
  }

  async updateSeasonOption(seasonId: number, key: string, optionUpdate: SeasonOptionUpdate): Promise<SeasonOption> {
    const seasonEntity: SeasonEntity = await this.seasonRepository.findOne(seasonId);
    const now: Date = new Date();
    // Check that the season is not in the past
    if (seasonEntity.endDate <= now) {
      throw new LockConstraintException(API_ERROR.SEASON.LOCK.PAST_SEASON);
    }

    const optionEntity: SeasonOptionEntity = await this.optionRepository.save({
      ...optionUpdate,
      configOption: { key },
      season: { id: seasonId }
    });
    return plainToClass(SeasonOption, optionEntity, { excludeExtraneousValues: true });
  }

  async deleteSeasonOption(seasonId: number, key: string): Promise<void> {
    const seasonEntity: SeasonEntity = await this.seasonRepository.findOne(seasonId);
    const now: Date = new Date();
    // Check that the season is not in the past
    if (seasonEntity.endDate <= now) {
      throw new LockConstraintException(API_ERROR.SEASON.LOCK.PAST_SEASON);
    } else if (seasonEntity.startDate <= now) {
      throw new LockConstraintException(API_ERROR.SEASON.LOCK.ACTIVE_SEASON);
    }

    await this.optionRepository.delete({
      where: {
        season: seasonId,
        configOption: key
      }
    } as FindConditions<SeasonOptionEntity>);
  }
}
