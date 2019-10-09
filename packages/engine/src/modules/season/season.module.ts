import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeasonOptionController } from './controllers/season-option.controller';
import { SeasonController } from './controllers/season.controller';
import { DB_ENTITIES } from './entities';
import { SeasonOptionService } from './services/season-option.service';
import { SeasonService } from './services/season.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  providers: [SeasonService, SeasonOptionService],
  controllers: [SeasonController, SeasonOptionController]
})
export class SeasonModule {}
