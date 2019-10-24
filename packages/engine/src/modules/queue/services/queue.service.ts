import { Queue, QueueDetailed } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { QueueEntity } from '../entities';

@Injectable()
export class QueueService {
  constructor(@InjectRepository(QueueEntity) private readonly queueRepository: Repository<QueueEntity>) {}

  async findQueues(gameId: number): Promise<Queue[]> {
    const queueEntities: QueueEntity[] = await this.queueRepository.find({
      relations: ['game', 'region'],
      where: {
        game: gameId
      }
    });
    return plainToClass(Queue, queueEntities, { excludeExtraneousValues: true });
  }

  async findQueue(queueId: number): Promise<QueueDetailed> {
    const queueEntity: QueueEntity = await this.queueRepository.findOne(queueId, {
      relations: ['game', 'region', 'players', 'players.elo']
    });
    return plainToClass(QueueDetailed, queueEntity, { excludeExtraneousValues: true });
  }
}
