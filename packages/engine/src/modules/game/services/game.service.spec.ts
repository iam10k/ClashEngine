import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GameEntity } from '../entities';
import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  const mockRepository = jest.fn(() => ({
    metadata: {
      columns: [],
      relations: []
    }
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GameService,
        {
          provide: getRepositoryToken(GameEntity),
          useValue: mockRepository
        }
      ]
    }).compile();

    service = module.get<GameService>(GameService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
