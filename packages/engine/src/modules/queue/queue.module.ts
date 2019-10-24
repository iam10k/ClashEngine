import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueController } from './controllers/queue.controller';
import { DB_ENTITIES } from './entities';
import { QueuePlayerService } from './services/queue-player.service';
import { QueueService } from './services/queue.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  controllers: [QueueController],
  providers: [QueueService, QueuePlayerService]
})
export class QueueModule {}
