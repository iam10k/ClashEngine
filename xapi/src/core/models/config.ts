import { BaseConfig } from '@clash/common';
import { Expose, Type } from 'class-transformer';
import { IsDefined, IsString, ValidateNested } from 'class-validator';
import { DiscordConfig } from './discord-config';

export class Config extends BaseConfig {
  @Expose()
  @IsDefined()
  @IsString()
  public readonly coreUrl: string;

  @Expose()
  @Type(() => DiscordConfig)
  @ValidateNested()
  public readonly discord: DiscordConfig;
}
