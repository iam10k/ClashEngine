import { ApiDocsInterface } from '@clash/common';
import { DiscordLogin } from '../modules/auth/dtos/discord-login.dto';

export const DOCS_DISCORD_LOGIN: ApiDocsInterface<DiscordLogin> = {
  PROPS: {
    code: {
      description: '',
      type: 'string'
    }
  }
};
