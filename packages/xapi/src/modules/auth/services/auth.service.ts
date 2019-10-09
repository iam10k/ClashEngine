import { AuthResponse, UserCreate, UserDetail } from '@clash/common';
import { JwtTokenService } from '@clash/core';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { DiscordLogin } from '../dtos/discord-login.dto';
import { DiscordUserResponse } from '../models/discord-user-response';
import { DiscordService } from './discord.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly discordService: DiscordService,
    private readonly tokenService: JwtTokenService,
    private readonly userService: UserService
  ) {}

  async loginDiscord(discordLogin: DiscordLogin): Promise<AuthResponse> {
    const discordTokenRes: any = await this.discordService.getAccessToken(discordLogin.code);

    const discordUser: DiscordUserResponse = await this.discordService.getDiscordUser(discordTokenRes.access_token);

    if (!discordUser.verified) {
      throw new Error();
    }
    const discordId: string = discordUser.id;

    let user: UserDetail = await this.userService.getUserDetailByDiscord(discordId);

    if (!user) {
      const userCreate: UserCreate = new UserCreate({
        email: discordUser.email,
        avatar: discordUser.avatar
      });

      user = await this.userService.addUser(discordId, userCreate);
    }

    return new AuthResponse(user, this.tokenService.generateToken(user));
  }
}
