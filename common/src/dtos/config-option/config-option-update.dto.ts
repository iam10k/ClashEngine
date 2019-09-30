import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, IsString, Length } from 'class-validator';

export class ConfigOptionUpdate {
  @ApiModelProperty()
  @IsDefined()
  @IsString()
  @Length(4, 256)
  @Expose()
  public description: string;
}
