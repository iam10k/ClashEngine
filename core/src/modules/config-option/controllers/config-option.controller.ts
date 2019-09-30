import { ConfigOption, ConfigOptionCreate, ConfigOptionUpdate } from '@clash/common';
import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiImplicitParam, ApiUseTags } from '@nestjs/swagger';
import { ConfigOptionService } from '../services/config-option.service';

@ApiUseTags('config-options')
@Controller('config-options')
export class ConfigOptionController {
  constructor(private readonly optionService: ConfigOptionService) {}

  @Get()
  getConfigOptions(): Promise<ConfigOption[]> {
    return this.optionService.findConfigOptions();
  }

  @Post()
  addConfigOption(@Body() optionCreate: ConfigOptionCreate): Promise<ConfigOption> {
    return this.optionService.addConfigOption(optionCreate);
  }

  @Put('/:key')
  @ApiImplicitParam({ name: 'key', description: '' })
  updateConfigOption(@Param('key') key: string, @Body() optionUpdate: ConfigOptionUpdate): Promise<ConfigOption> {
    return this.optionService.updateConfigOption(key, optionUpdate);
  }
}
