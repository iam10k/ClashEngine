import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';
import { Default } from '../decorators';

export class JwtConfig {
  @Expose()
  @IsDefined()
  @IsString()
  public readonly secretKey: string;

  @Expose()
  @IsDefined()
  @IsNumber()
  public readonly expiresDelta: string | number;

  @Expose()
  @IsDefined()
  @IsString()
  public readonly issuer: string;

  @Expose()
  @Default('Bearer')
  @IsDefined()
  @IsString()
  public readonly headerPrefix?: string;
}

export const JWT_CONFIG_TOKEN: string = 'JwtConfigToken';
