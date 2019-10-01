import { ValidationQuery } from '@clash/common';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { MatchFindOptions } from '../dtos/match-find-options.dto';
import { MatchPagedResponse } from '../dtos/match-paged-response.dto';
import { Match } from '../dtos/match.dto';
import { MatchService } from '../services/match.service';

@Controller()
@ApiUseTags('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('/seasons/:seasonId/matches')
  @ApiOkResponse({ type: MatchPagedResponse })
  // @ApiImplicitParam(DOCS_SEASON.PATH.id) TODO
  getMatchesForSeason(
    @Param('seasonId', new ParseIntPipe()) seasonId: number,
    @ValidationQuery() findOptions: MatchFindOptions
  ): Promise<MatchPagedResponse> {
    if (!findOptions) {
      findOptions = new MatchFindOptions();
    }
    findOptions.seasonId = seasonId;
    return this.findMatches(findOptions);
  }

  @Get('/matches')
  @ApiOkResponse({ type: MatchPagedResponse })
  findMatches(@ValidationQuery() findOptions: MatchFindOptions): Promise<MatchPagedResponse> {
    return this.matchService.findMatches(findOptions);
  }

  @Get('/matches/:matchId')
  @ApiOkResponse({ type: Match })
  @ApiImplicitParam({ name: 'matchId', description: '' })
  getMatch(@Param('matchId', new ParseIntPipe()) matchId: number): Promise<Match> {
    return this.matchService.findMatch(matchId);
  }
}
