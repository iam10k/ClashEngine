import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameOptionController } from './controllers/game-option.controller';
import { GameController } from './controllers/game.controller';
import { DB_ENTITIES } from './entities';
import { GameOptionService } from './services/game-option.service';
import { GameService } from './services/game.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  providers: [GameService, GameOptionService],
  controllers: [GameController, GameOptionController]
})
export class GameModule {}
