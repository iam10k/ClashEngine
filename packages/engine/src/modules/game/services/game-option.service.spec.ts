import { Test, TestingModule } from '@nestjs/testing';
import { GameOptionService } from './game-option.service';

describe('GameOptionService', () => {
  let service: GameOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameOptionService]
    }).compile();

    service = module.get<GameOptionService>(GameOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
