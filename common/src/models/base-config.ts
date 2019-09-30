import { Expose, Type } from 'class-transformer';
import { IsDefined, IsIP, IsNumber, IsString, ValidateNested } from 'class-validator';
import { JwtConfig } from './jwt-config';

export class BaseConfig {
  @Expose()
  @IsDefined()
  @IsString()
  @IsIP()
  public readonly host: string;

  @Expose()
  @IsDefined()
  @IsNumber()
  public readonly port: number;

  @Expose()
  @IsDefined()
  @IsString()
  public readonly url: string;

  @Expose()
  @Type(() => JwtConfig)
  @ValidateNested()
  public readonly jwt: JwtConfig;
}
