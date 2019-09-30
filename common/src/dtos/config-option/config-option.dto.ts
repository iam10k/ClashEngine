import { ApiModelProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ConfigOption {
  @ApiModelProperty()
  @Expose()
  public key: string;

  @ApiModelProperty()
  @Expose()
  public description: string;
}
