import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchTeamController } from './controllers/match-team.controller';
import { DB_ENTITIES } from './entities';
import { MatchTeamMemberService } from './services/match-team-member.service';
import { MatchTeamService } from './services/match-team.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  controllers: [MatchTeamController],
  providers: [MatchTeamService, MatchTeamMemberService],
  exports: [MatchTeamService, MatchTeamMemberService]
})
export class MatchTeamModule {}
