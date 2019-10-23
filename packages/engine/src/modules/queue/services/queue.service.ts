import { Queue } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { QueueEntity } from '../entities';

@Injectable()
export class QueueService {
  constructor(@InjectRepository(QueueEntity) private readonly queueRepository: Repository<QueueEntity>) {}

  async getQueues(gameId: number): Promise<Queue[]> {
    const queueEntities: QueueEntity[] = await this.queueRepository.find({
      relations: ['game', 'region', 'players', 'players.elo'],
      where: {
        game: gameId
      }
    });
    return plainToClass(Queue, queueEntities, { excludeExtraneousValues: true });
  }
}
