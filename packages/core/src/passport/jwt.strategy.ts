import { JwtPayloadInterface, UserDetail } from '@clash/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-jwt';
import { JwtTokenService } from '../services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly tokenService: JwtTokenService) {
    super({
      passReqToCallback: true,
      jwtFromRequest: req => {
        return this.tokenService.extractTokenFromRequest(req);
      },
      secretOrKeyProvider: (req, token, done) => {
        const secretKey = this.tokenService.createSecretKey(plainToClass(UserDetail, this.tokenService.decode(token)));
        done(null, secretKey);
      },
      issuer: tokenService.jwtConfig.issuer
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
