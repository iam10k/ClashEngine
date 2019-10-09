import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsString, Length } from 'class-validator';
import { ConfigOptionUpdate } from './config-option-update.dto';

export class ConfigOptionCreate extends ConfigOptionUpdate {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Length(2, 10)
  @Expose()
  public key: string;
}
