import { Queue } from '@clash/common';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiImplicitParam, ApiOkResponse, ApiUseTags } from '@nestjs/swagger';
import { QueueService } from '../services/queue.service';

@ApiUseTags('queues')
@Controller()
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Get('/games/:gameId/queues')
  @ApiOkResponse({ type: Queue, isArray: true })
  @ApiImplicitParam({ name: 'gameId', description: '' })
  getQueuesForGame(@Param('gameId', new ParseIntPipe()) gameId: number): Promise<Queue[]> {
    return this.queueService.getQueues(gameId);
  }
}
