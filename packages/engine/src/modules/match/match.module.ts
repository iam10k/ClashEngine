import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchController } from './controllers/match.controller';
import { DB_ENTITIES } from './entities';
import { MatchService } from './services/match.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
