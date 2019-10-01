import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { GameOptionUpdate } from '../dtos/game-option-update.dto';
import { GameOption } from '../dtos/game-option.dto';
import { GameOptionService } from '../services/game-option.service';

@Controller('/games/:gameId/options')
@ApiUseTags('game-options')
export class GameOptionController {
  constructor(private readonly optionService: GameOptionService) {}

  @Get()
  getGameOptions(@Param('gameId', new ParseIntPipe()) gameId: number): Promise<GameOption[]> {
    return this.optionService.findGameOptions(gameId);
  }

  @Put('/:key')
  updateGameOption(
    @Param('gameId', new ParseIntPipe()) gameId: number,
    @Param('key') key: string,
    @Body() optionUpdate: GameOptionUpdate
  ): Promise<GameOption> {
    return this.optionService.updateGameOption(gameId, key, optionUpdate);
  }

  @Delete('/:key')
  deleteSeasonOption(@Param('gameId', new ParseIntPipe()) gameId: number, @Param('key') key: string): Promise<any> {
    return this.optionService.deleteGameOption(gameId, key);
  }
}
