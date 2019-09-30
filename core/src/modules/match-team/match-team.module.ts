import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchTeamController } from './controllers/match-team.controller';
import { DB_ENTITIES } from './entities';
import { MatchTeamService } from './services/match-team.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  controllers: [MatchTeamController],
  providers: [MatchTeamService]
})
export class MatchTeamModule {}
