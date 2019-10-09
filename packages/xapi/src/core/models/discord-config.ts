import { IsDefined, IsString } from 'class-validator';

export class DiscordConfig {
  @IsDefined()
  @IsString()
  public readonly clientSecret: string;

  @IsDefined()
  @IsString()
  public readonly clientId: string;

  @IsDefined()
  @IsString()
  public readonly redirectUri: string;

  @IsDefined()
  @IsString()
  public readonly authUrl: string;

  @IsDefined()
  @IsString()
  public readonly apiUrl: string;
}
