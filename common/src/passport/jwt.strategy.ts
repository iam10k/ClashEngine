import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-jwt';
import { UserDetail } from '../dtos/user';
import { JwtPayloadInterface } from '../interfaces';
import { JWT_CONFIG_TOKEN, JwtConfig } from '../models';
import { JwtTokenService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(JWT_CONFIG_TOKEN) private readonly jwtConfig: JwtConfig,
    private readonly tokenService: JwtTokenService
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: req => {
        return this.tokenService.extractTokenFromRequest(req);
      },
      secretOrKeyProvider: (req, token, done) => {
        const secretKey = this.tokenService.createSecretKey(plainToClass(UserDetail, this.tokenService.decode(token)));
        done(null, secretKey);
      },
      issuer: jwtConfig.issuer
    });
  }

  public async validate(req, payload: JwtPayloadInterface) {
    try {
      return payload;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
