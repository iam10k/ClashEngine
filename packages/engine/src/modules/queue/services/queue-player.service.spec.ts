import { Test, TestingModule } from '@nestjs/testing';
import { QueuePlayerService } from './queue-player.service';

describe('QueuePlayerService', () => {
  let service: QueuePlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueuePlayerService],
    }).compile();

    service = module.get<QueuePlayerService>(QueuePlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
