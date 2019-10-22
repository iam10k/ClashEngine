import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueController } from './controllers/queue.controller';
import { DB_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  controllers: [QueueController]
})
export class QueueModule {}
