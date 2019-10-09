import { Test, TestingModule } from '@nestjs/testing';
import { GameOptionController } from './game-option.controller';

describe('GameOption Controller', () => {
  let controller: GameOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameOptionController]
    }).compile();

    controller = module.get<GameOptionController>(GameOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
