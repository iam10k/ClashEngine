import { Season, SeasonCreate, SeasonDetailed, SeasonUpdate } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Brackets, Repository } from 'typeorm';
import { API_ERROR } from '../../../constants';
import { DataConstraintException, LockConstraintException } from '../../../core/exceptions';
import { SeasonEntity } from '../entities';

@Injectable()
export class SeasonService {
  constructor(@InjectRepository(SeasonEntity) private readonly seasonRepository: Repository<SeasonEntity>) {}

  async findSeasons(gameId: number): Promise<Season[]> {
    const seasonEntities: SeasonEntity[] = await this.seasonRepository.find({
      where: {
        game: gameId
      }
    });
    return plainToClass(Season, seasonEntities, { excludeExtraneousValues: true });
  }

  async findSeason(id: number): Promise<SeasonDetailed> {
    const seasonEntity: SeasonEntity = await this.seasonRepository.findOne({
      relations: ['options', 'options.option'],
      where: {
        id
      }
    });
    return plainToClass(SeasonDetailed, seasonEntity, { excludeExtraneousValues: true });
  }

  async addSeason(gameId: number, seasonCreate: SeasonCreate): Promise<Season> {
    await this.checkForOverlappingSeasons(gameId, seasonCreate.startDate, seasonCreate.endDate);

    const seasonEntity: SeasonEntity = await this.seasonRepository.save({
      ...seasonCreate,
      game: { id: gameId }
    });
    return plainToClass(Season, seasonEntity, { excludeExtraneousValues: true });
  }

  async updateSeason(seasonId: number, seasonUpdate: SeasonUpdate): Promise<Season> {
    const existingSeason: SeasonEntity = await this.seasonRepository.findOne(seasonId);

    const isUpdatingDates: boolean = !!seasonUpdate.startDate || !!seasonUpdate.endDate;
    const now: Date = new Date();
    // Check that the dates can't be updated for past seasons
    if (existingSeason.endDate <= now) {
      throw new LockConstraintException(API_ERROR.SEASON.LOCK.PAST_SEASON);
    }
    if (isUpdatingDates) {
      // Set the start date from the existing if active season
      if (existingSeason.startDate <= now) {
        seasonUpdate.startDate = existingSeason.startDate;
      }

      // Check for overlapping dates
      await this.checkForOverlappingSeasons(
        existingSeason.gameId,
        seasonUpdate.startDate || existingSeason.startDate,
        seasonUpdate.endDate || existingSeason.endDate
      );
    }

    const seasonEntity: SeasonEntity = await this.seasonRepository.save({
      ...seasonUpdate,
      id: seasonId
    });
    return plainToClass(Season, seasonEntity, { excludeExtraneousValues: true });
  }

  async deleteSeason(seasonId: number): Promise<void> {
    const seasonEntity: SeasonEntity = await this.seasonRepository.findOne(seasonId);
    const now: Date = new Date();
    // Check that the season is in the future
    if (seasonEntity.endDate <= now) {
      throw new LockConstraintException(API_ERROR.SEASON.LOCK.PAST_SEASON);
    } else if (seasonEntity.startDate <= now) {
      throw new LockConstraintException(API_ERROR.SEASON.LOCK.ACTIVE_SEASON);
    }

    await this.seasonRepository.remove(seasonEntity);
    return;
  }

  private async checkForOverlappingSeasons(gameId: number, startDate: Date, endDate: Date): Promise<void> {
    const overlapping: number = await this.seasonRepository
      .createQueryBuilder('season')
      .select('DISTINCT(season.id)')
      .where('season.game = :gameId', { gameId })
      // Check for overlapping start date
      .andWhere(
        new Brackets(qb => {
          qb.where('season.endDate >= :startDate', { startDate })
            .andWhere('season.startDate >= :startDate', { startDate })
            // Check for overlapping end date
            .orWhere('season.startDate <= :endDate', { endDate })
            .andWhere('season.endDate >= :endDate', { endDate })
            // Check for overlapping all seasons
            .orWhere('season.startDate >= :startDate', { startDate })
            .andWhere('season.endDate <= :endDate', { endDate });
        })
      )
      .getCount();

    if (overlapping > 0) {
      throw new DataConstraintException(API_ERROR.SEASON.CHECK.DATE_RANGE_OVERLAPS);
    }
  }
}
