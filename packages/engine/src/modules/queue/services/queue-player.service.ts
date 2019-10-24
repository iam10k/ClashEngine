import { QueuePlayer } from '@clash/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { QueuePlayerEntity } from '../entities';

@Injectable()
export class QueuePlayerService {
  constructor(
    @InjectRepository(QueuePlayerEntity) private readonly queuePlayerRepository: Repository<QueuePlayerEntity>
  ) {}
}
