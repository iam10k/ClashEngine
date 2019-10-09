import { ValidationQuery } from '@clash/common';
import { Game, GameCreate, GameFindOptions, GamePagedResponse, GameUpdate } from '@clash/common';
import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
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
