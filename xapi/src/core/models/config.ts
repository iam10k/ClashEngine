import { BaseConfig } from '@clash/common';
import { Expose, Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { DiscordConfig } from './discord-config';

export class Config extends BaseConfig {
  @Expose()
  @Type(() => DiscordConfig)
  @ValidateNested()
  public readonly discord: DiscordConfig;
}
