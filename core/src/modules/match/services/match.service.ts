import { ArrayUtil } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { SqlUtil } from '../../../utils';
import { MatchCreate } from '../dtos/match-create.dto';
import { MatchFindOptions } from '../dtos/match-find-options.dto';
import { MatchPagedResponse } from '../dtos/match-paged-response.dto';
import { MatchUpdate } from '../dtos/match-update.dto';
import { Match } from '../dtos/match.dto';
import { MatchEntity } from '../entities';

@Injectable()
export class MatchService {
  constructor(@InjectRepository(MatchEntity) private readonly matchRepository: Repository<MatchEntity>) {}

  async findMatches(findOptions: MatchFindOptions): Promise<MatchPagedResponse> {
    const query = this.matchRepository.createQueryBuilder('match');

    let hasWhere: boolean = false;
    if (findOptions.seasonId) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'match.season = :seasonId', { seasonId: findOptions.seasonId });
    }
    if (findOptions.fromDate) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'match.createdAt >= :from', { from: findOptions.fromDate });
    }
    if (findOptions.toDate) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'match.createdAt <= :to', { to: findOptions.toDate });
    }
    if (!ArrayUtil.isEmpty(findOptions.type)) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'match.type IN (:...type)', { type: findOptions.type });
    }
    if (!ArrayUtil.isEmpty(findOptions.status)) {
      SqlUtil.addWhere(query, hasWhere, 'match.status IN (:...status)', { status: findOptions.status });
    }

    const [matchEntities, count]: [MatchEntity[], number] = await query
      .leftJoinAndSelect('match.teams', 'team')
      .skip(findOptions.skip)
      .take(findOptions.take)
      .orderBy('match.id', findOptions.order)
      .getManyAndCount();

    const matches: Match[] = plainToClass(Match, matchEntities, { excludeExtraneousValues: true });
    return new MatchPagedResponse(matches, count, findOptions);
  }

  async findMatch(matchId: number): Promise<Match> {
    const matchEntity: MatchEntity = await this.matchRepository.findOne(matchId, {
      relations: ['teams']
    });
    return plainToClass(Match, matchEntity, { excludeExtraneousValues: true });
  }

  async addMatch(seasonId: number, matchCreate: MatchCreate): Promise<Match> {
    const matchEntity: MatchEntity = await this.matchRepository.save({
      ...matchCreate,
      season: { id: seasonId }
    });
    return plainToClass(Match, matchEntity, { excludeExtraneousValues: true });
  }

  async updateMatch(matchId: number, matchUpdate: MatchUpdate): Promise<Match> {
    const matchEntity: MatchEntity = await this.matchRepository.save({
      ...matchUpdate,
      id: matchId
    });
    return plainToClass(Match, matchEntity, { excludeExtraneousValues: true });
  }
}
