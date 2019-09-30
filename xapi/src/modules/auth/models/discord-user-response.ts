import { Expose } from 'class-transformer';

export class DiscordUserResponse {
  id: string;

  username: string;

  discriminator: string;

  avatar?: string;

  bot?: boolean;

  @Expose({ name: 'mfa_enabled', toClassOnly: true })
  mfaEnabled?: boolean;

  locale?: string;

  verified?: boolean;

  email?: string;

  flags?: number;

  @Expose({ name: 'premium_type', toClassOnly: true })
  premiumType?: number;
}
