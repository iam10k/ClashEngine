import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchTeamModule } from '../match-team/match-team.module';
import { MatchController } from './controllers/match.controller';
import { DB_ENTITIES } from './entities';
import { MatchService } from './services/match.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES), MatchTeamModule],
  controllers: [MatchController],
  providers: [MatchService],
  exports: [MatchService]
})
export class MatchModule {}
