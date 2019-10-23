import {
  ArrayUtil,
  Match,
  MatchCreate,
  MatchFindOptions,
  MatchPagedResponse,
  MatchTeamMember,
  MatchUpdate
} from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { SqlUtil } from '../../../utils';
import { MatchTeamEntity } from '../../match-team/entities';
import { MatchTeamMemberService } from '../../match-team/services/match-team-member.service';
import { MatchEntity } from '../entities';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(MatchEntity) private readonly matchRepository: Repository<MatchEntity>,
    private readonly matchTeamMemberService: MatchTeamMemberService
  ) {}

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
    if (!ArrayUtil.isEmpty(findOptions.region)) {
      hasWhere = SqlUtil.addWhere(query, hasWhere, 'match.region IN (:...region)', { region: findOptions.region });
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
      relations: ['teams', 'teams.members', 'teams.members.user']
    });
    return plainToClass(Match, matchEntity, { excludeExtraneousValues: true });
  }

  async addMatch(seasonId: number, matchCreate: MatchCreate): Promise<Match> {
    const matchEntity: MatchEntity = await this.matchRepository.save({
      type: matchCreate.type,
      season: { id: seasonId },
      teams:
        matchCreate.teams.map(team => {
          return {
            ...team,
            members: undefined
          };
        }) || []
    });
    const res: Match = plainToClass(Match, matchEntity, { excludeExtraneousValues: true });

    // Create members for each team, using promise all
    const promiseTasks: Array<Promise<MatchTeamMember[]>> = matchEntity.teams.map(
      (team: MatchTeamEntity, index: number) =>
        this.matchTeamMemberService.addMatchTeamMembers(team.id, matchCreate.teams[index].members)
    );
    await Promise.all(promiseTasks).then(values =>
      values.forEach((teamMembers: MatchTeamMember[], index: number) => (res.teams[index].members = teamMembers))
    );
    return res;
  }

  async updateMatch(matchId: number, matchUpdate: MatchUpdate): Promise<Match> {
    const matchEntity: MatchEntity = await this.matchRepository.save({
      ...matchUpdate,
      id: matchId
    });
    return plainToClass(Match, matchEntity, { excludeExtraneousValues: true });
  }
}
