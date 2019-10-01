import { ValidationQuery } from '@clash/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { GameCreate } from '../dtos/game-create.dto';
import { GameFindOptions } from '../dtos/game-find-options.dto';
import { GamePagedResponse } from '../dtos/game-paged-response.dto';
import { GameUpdate } from '../dtos/game-update.dto';
import { Game } from '../dtos/game.dto';
import { GameService } from '../services/game.service';

@ApiUseTags('games')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get()
  @ApiOkResponse({ type: GamePagedResponse })
  getGames(@ValidationQuery() findOptions: GameFindOptions): Promise<GamePagedResponse> {
    return this.gameService.findGames(findOptions);
  }

  @Post()
  addGame(@Body() gameCreate: GameCreate): Promise<Game> {
    return this.gameService.addGame(gameCreate);
  }

  @Put('/:gameId')
  // @ApiImplicitParam(DOCS_GAME.PATH.id) TODO
  updateGame(@Param('gameId', new ParseIntPipe()) gameId: number, @Body() gameUpdate: GameUpdate): Promise<Game> {
    return this.gameService.updateGame(gameId, gameUpdate);
  }
}
