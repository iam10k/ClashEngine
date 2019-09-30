import { Inject, Injectable } from '@nestjs/common';
import { decode, sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { AuthToken } from '../dtos/auth';
import { UserDetail } from '../dtos/user';
import { JwtPayloadInterface } from '../interfaces';
import { BaseConfig, JwtConfig } from '../models';
import { ConfigService } from './config.service';

@Injectable()
export class JwtTokenService {
  private readonly SIGN_OPTIONS: SignOptions = {
    expiresIn: this.jwtConfig.expiresDelta,
    issuer: this.jwtConfig.issuer
  };
  private readonly VERIFY_OPTIONS: VerifyOptions = {
    issuer: this.jwtConfig.issuer
  };

  constructor(@Inject(ConfigService) private readonly configService: ConfigService<BaseConfig>) {}

  get jwtConfig(): JwtConfig {
    return this.configService.config.jwt;
  }

  generateToken(user: UserDetail): AuthToken {
    const tokenStr: string = sign(
      {
        id: user.id,
        roles: user.roles,
        flags: user.flags
      } as JwtPayloadInterface,
      this.createSecretKey(user),
      this.SIGN_OPTIONS
    );
    const token: JwtPayloadInterface = this.decode(tokenStr);
    return new AuthToken(tokenStr, new Date(token.exp));
  }

  validate(token: string): string | object {
    const data: any = this.decode(token);
    return verify(this.removeHeaderPrefix(token), this.createSecretKey(data), this.VERIFY_OPTIONS);
  }

  decode(token: string): JwtPayloadInterface {
    return decode(this.removeHeaderPrefix(token)) as JwtPayloadInterface;
  }

  removeHeaderPrefix(token: string): string {
    return this.jwtConfig.headerPrefix && token && token.includes(this.jwtConfig.headerPrefix + ' ')
      ? token.slice(this.jwtConfig.headerPrefix.length + 1)
      : token;
  }

  extractTokenFromRequest(request): string {
    const authorizationHeader = request.headers.authorization ? String(request.headers.authorization) : null;
    return this.removeHeaderPrefix(authorizationHeader);
  }

  createSecretKey(user: UserDetail): string {
    return this.jwtConfig.secretKey + user ? [user.id, user.roles, user.flags].join('$') : '';
  }
}
