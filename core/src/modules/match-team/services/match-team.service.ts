import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { MatchTeamCreate } from '../dtos/match-team-create.dto';
import { MatchTeamUpdate } from '../dtos/match-team-update.dto';
import { MatchTeam } from '../dtos/match-team.dto';
import { MatchTeamEntity } from '../entities';

@Injectable()
export class MatchTeamService {
  constructor(@InjectRepository(MatchTeamEntity) private readonly matchTeamRepository: Repository<MatchTeamEntity>) {}

  async findMatchTeams(seasonId: number): Promise<MatchTeam[]> {
    const matchTeamEntities: MatchTeamEntity[] = await this.matchTeamRepository.find({
      relations: ['teams'],
      where: {
        season: seasonId
      }
    });
    return plainToClass(MatchTeam, matchTeamEntities, { excludeExtraneousValues: true });
  }

  async findMatchTeam(matchId: number): Promise<MatchTeam> {
    const matchTeamEntity: MatchTeamEntity = await this.matchTeamRepository.findOne(matchId, {
      relations: ['teams']
    });
    return plainToClass(MatchTeam, matchTeamEntity, { excludeExtraneousValues: true });
  }

  async addMatchTeam(matchId: number, matchCreate: MatchTeamCreate): Promise<MatchTeam> {
    const matchTeamEntity: MatchTeamEntity = await this.matchTeamRepository.save({
      ...matchCreate,
      match: { id: matchId }
    });
    return plainToClass(MatchTeam, matchTeamEntity, { excludeExtraneousValues: true });
  }

  async updateMatchTeam(matchId: number, matchUpdate: MatchTeamUpdate): Promise<MatchTeam> {
    const matchTeamEntity: MatchTeamEntity = await this.matchTeamRepository.save({
      ...matchUpdate,
      id: matchId
    });
    return plainToClass(MatchTeam, matchTeamEntity, { excludeExtraneousValues: true });
  }
}
