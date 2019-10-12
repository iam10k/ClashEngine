import { MatchTeam, MatchTeamCreate, MatchTeamMember, MatchTeamUpdate } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { MatchTeamEntity } from '../entities';
import { MatchTeamMemberService } from './match-team-member.service';

@Injectable()
export class MatchTeamService {
  constructor(
    @InjectRepository(MatchTeamEntity) private readonly matchTeamRepository: Repository<MatchTeamEntity>,
    private readonly matchTeamMemberService: MatchTeamMemberService
  ) {}

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

  async addMatchTeam(matchId: number, matchTeamCreate: MatchTeamCreate): Promise<MatchTeam> {
    const matchTeamEntity: MatchTeamEntity = await this.matchTeamRepository.save({
      memberIds: matchTeamCreate.members,
      match: { id: matchId }
    });
    return plainToClass(MatchTeam, matchTeamEntity, { excludeExtraneousValues: true });
  }

  async addMatchTeams(matchId: number, matchTeamCreates: MatchTeamCreate[]): Promise<MatchTeam[]> {
    if (!matchTeamCreates) {
      return Promise.resolve([]);
    }

    const matchTeamEntities: MatchTeamEntity[] = await this.matchTeamRepository.save(
      matchTeamCreates.map(matchTeamCreate => {
        return {
          match: { id: matchId }
        };
      })
    );

    const matchTeams: MatchTeam[] = plainToClass(MatchTeam, matchTeamEntities, { excludeExtraneousValues: true });

    // Create members for each team, using promise
    const promiseTasks: Array<Promise<MatchTeamMember[]>> = matchTeamEntities.map(
      (team: MatchTeamEntity, index: number) =>
        this.matchTeamMemberService.addMatchTeamMembers(team.id, matchTeamCreates[index].members)
    );
    await Promise.all(promiseTasks).then(values =>
      values.forEach((teamMembers: MatchTeamMember[], index: number) => (matchTeams[index].members = teamMembers))
    );

    return matchTeams;
  }

  async updateMatchTeam(matchId: number, matchUpdate: MatchTeamUpdate): Promise<MatchTeam> {
    const matchTeamEntity: MatchTeamEntity = await this.matchTeamRepository.save({
      ...matchUpdate,
      id: matchId
    });
    return plainToClass(MatchTeam, matchTeamEntity, { excludeExtraneousValues: true });
  }
}
