import { AuthResponse, JwtTokenService, UserDetail } from '@clash/common';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { DiscordLogin } from '../dtos/discord-login.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly tokenService: JwtTokenService) {}

  @Post('/login/discord')
  @ApiOkResponse({ type: AuthResponse })
  async addConfigOption(@Body() discordLogin: DiscordLogin): Promise<AuthResponse> {
    // const authResponse: AuthResponse = await this.authService.loginDiscord(discordLogin);
    // return authResponse;
    const user: UserDetail = plainToClass(UserDetail, { id: 1, email: 'e@e.com', discordId: '1234', avatar: '' });
    return await Promise.resolve(new AuthResponse(user, this.tokenService.generateToken(user)));
  }
}
