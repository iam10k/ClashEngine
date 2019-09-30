import { ClashCoreModule } from '@clash/common';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { DiscordService } from './services/discord.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, DiscordService],
  imports: [ClashCoreModule, UserModule]
})
export class AuthModule {}
