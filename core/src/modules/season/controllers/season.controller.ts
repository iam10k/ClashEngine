import { ErrorResponse } from '@clash/common';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import {
  ApiImplicitParam,
  ApiImplicitQuery,
  ApiOkResponse,
  ApiUnprocessableEntityResponse,
  ApiUseTags
} from '@nestjs/swagger';
import { SeasonCreate } from '../dtos/season-create.dto';
import { SeasonDetailed } from '../dtos/season-detailed.dto';
import { SeasonUpdate } from '../dtos/season-update.dto';
import { Season } from '../dtos/season.dto';
import { SeasonService } from '../services/season.service';

@ApiUseTags('seasons')
@Controller()
export class SeasonController {
  constructor(private readonly seasonService: SeasonService) {}

  @Get('/games/:gameId/seasons')
  @ApiOkResponse({ type: Season, isArray: true })
  @ApiImplicitParam({ name: 'gameId', description: '' })
  getSeasonsForGame(@Param('gameId', new ParseIntPipe()) gameId: number): Promise<Season[]> {
    return this.findSeasons(gameId);
  }

  @Post('/games/:gameId/seasons')
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiImplicitParam({ name: 'gameId', description: '' })
  addSeason(@Param('gameId', new ParseIntPipe()) gameId: number, @Body() seasonCreate: SeasonCreate): Promise<Season> {
    return this.seasonService.addSeason(gameId, seasonCreate);
  }

  // TODO: Improve to have pagination and filtering options
  @Get('/seasons')
  @ApiOkResponse({ type: Season, isArray: true })
  @ApiImplicitQuery({ name: 'gameId', description: '', required: false })
  findSeasons(@Query('gameId', new ParseIntPipe()) gameId: number): Promise<Season[]> {
    return this.seasonService.findSeasons(gameId);
  }

  @Get('/seasons/:seasonId')
  @ApiOkResponse({ type: SeasonDetailed })
  @ApiImplicitParam({ name: 'seasonId', description: '' })
  getSeason(@Param('seasonId', new ParseIntPipe()) seasonId: number): Promise<SeasonDetailed> {
    return this.seasonService.findSeason(seasonId);
  }

  @Put('/seasons/:seasonId')
  @ApiUnprocessableEntityResponse({ type: ErrorResponse })
  @ApiImplicitParam({ name: 'seasonId', description: '' })
  updateSeason(
    @Param('seasonId', new ParseIntPipe()) seasonId: number,
    @Body() seasonUpdate: SeasonUpdate
  ): Promise<Season> {
    return this.seasonService.updateSeason(seasonId, seasonUpdate);
  }

  @Delete('/seasons/:seasonId')
  @ApiImplicitParam({ name: 'seasonId', description: '' })
  deleteSeason(@Param('seasonId', new ParseIntPipe()) seasonId: number): Promise<void> {
    return this.seasonService.deleteSeason(seasonId);
  }
}
