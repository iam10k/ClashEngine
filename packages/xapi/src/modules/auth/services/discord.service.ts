import { ConfigService } from '@clash/core';
import { HttpService, Inject, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { stringify } from 'querystring';
import { map, tap } from 'rxjs/operators';
import { API_CONST } from '../../../constants/api.constant';
import { Config, DiscordConfig } from '../../../core/models';
import { DiscordUserResponse } from '../models/discord-user-response';

@Injectable()
export class DiscordService {
  private readonly USER_AGENT: string = `${API_CONST.APP_INFO.NAME} (${this.config.config.url}, ${API_CONST.APP_INFO.VERSION})`;

  constructor(
    private readonly http: HttpService,
    @Inject(ConfigService) private readonly config: ConfigService<Config>
  ) {}

  private get discordConfig(): DiscordConfig {
    return this.config.config.discord;
  }

  async getAccessToken(code: string): Promise<any> {
    return await this.http
      .post(
        this.discordAuthUri(),
        stringify({
          client_id: this.discordConfig.clientId,
          client_secret: this.discordConfig.clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.discordConfig.redirectUri,
          scope: 'identify email'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': this.USER_AGENT
          }
        }
      )
      .pipe(
        map(res => res.data),
        tap(
          _ => void 0,
          error => {
            Logger.log(`Discord Token Error: ${error.status}\n${error.data}`);
          }
        )
      )
      .toPromise();
  }

  async getDiscordUser(userAccessToken: string): Promise<DiscordUserResponse> {
    return await this.http
      .get<DiscordUserResponse>(this.discordApiUserUri(), {
        headers: {
          Authorization: `Bearer ${userAccessToken}`,
          'User-Agent': this.USER_AGENT
        }
      })
      .pipe(
        map(res => plainToClass(DiscordUserResponse, res.data)),
        tap(
          _ => void 0,
          error => {
            Logger.log(`Discord User Fetch Error: ${error.status}\n${error.data}`);
          }
        )
      )
      .toPromise();
  }

  private discordAuthUri(): string {
    return `${this.discordConfig.authUrl}/token`;
  }

  private discordApiUserUri(): string {
    return `${this.discordConfig.apiUrl}/users/@me`;
  }
}
