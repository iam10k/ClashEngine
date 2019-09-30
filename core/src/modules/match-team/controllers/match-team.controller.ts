import { ErrorResponse, MatchTeam, MatchTeamCreate, MatchTeamUpdate } from '@clash/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import {
  ApiImplicitParam,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiUseTags
} from '@nestjs/swagger';
import { MatchTeamService } from '../services/match-team.service';

@Controller()
@ApiUseTags('match-teams')
export class MatchTeamController {
  constructor(private readonly matchTeamService: MatchTeamService) {}

  @Get('/matches/:matchId/teams')
  @ApiOkResponse({ type: MatchTeam, isArray: true })
  @ApiImplicitParam({ name: 'matchId', description: '' })
  getMatchesForSeason(@Param('matchId', new ParseIntPipe()) matchId: number): Promise<MatchTeam[]> {
    return this.matchTeamService.findMatchTeams(matchId);
  }

  @Post('/matches/:matchId/teams')
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiImplicitParam({ name: 'matchId', description: '' })
  addMatch(
    @Param('matchId', new ParseIntPipe()) matchId: number,
    @Body() matchTeamCreate: MatchTeamCreate
  ): Promise<MatchTeam> {
    return this.matchTeamService.addMatchTeam(matchId, matchTeamCreate);
  }

  // TODO: Improve to have pagination and filtering options
  @Get('/match-teams')
  @ApiOkResponse({ type: MatchTeam, isArray: true })
  @ApiImplicitQuery({ name: 'matchId', description: '', required: false })
  findMatches(@Query('matchId', new ParseIntPipe()) matchId: number): Promise<MatchTeam[]> {
    return this.matchTeamService.findMatchTeams(matchId);
  }

  @Get('/match-teams/:matchTeamId')
  @ApiOkResponse({ type: MatchTeam })
  @ApiImplicitParam({ name: 'matchTeamId', description: '' })
  getMatch(@Param('matchTeamId', new ParseIntPipe()) matchTeamId: number): Promise<MatchTeam> {
    return this.matchTeamService.findMatchTeam(matchTeamId);
  }

  @Put('/match-teams/:matchTeamId')
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiImplicitParam({ name: 'matchTeamId', description: '' })
  updateMatch(
    @Param('matchTeamId', new ParseIntPipe()) matchTeamId: number,
    @Body() matchTeamUpdate: MatchTeamUpdate
  ): Promise<MatchTeam> {
    return this.matchTeamService.updateMatchTeam(matchTeamId, matchTeamUpdate);
  }
}
