import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SeasonOptionUpdate } from '../dtos/season-option-update.dto';
import { SeasonOption } from '../dtos/season-option.dto';
import { SeasonOptionService } from '../services/season-option.service';

@Controller('/seasons/:seasonId/options')
@ApiUseTags('season-options')
export class SeasonOptionController {
  constructor(private readonly optionService: SeasonOptionService) {}

  @Get()
  getSeasonOptions(@Param('seasonId', new ParseIntPipe()) seasonId: number): Promise<SeasonOption[]> {
    return this.optionService.findSeasonOptions(seasonId);
  }

  @Put('/:key')
  updateSeasonOption(
    @Param('seasonId', new ParseIntPipe()) seasonId: number,
    @Param('key') key: string,
    @Body() optionUpdate: SeasonOptionUpdate
  ): Promise<SeasonOption> {
    return this.optionService.updateSeasonOption(seasonId, key, optionUpdate);
  }

  @Delete('/:key')
  deleteSeasonOption(@Param('seasonId', new ParseIntPipe()) seasonId: number, @Param('key') key: string): Promise<any> {
    return this.optionService.deleteSeasonOption(seasonId, key);
  }
}
