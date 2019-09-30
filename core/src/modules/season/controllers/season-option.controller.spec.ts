import { Test, TestingModule } from '@nestjs/testing';
import { SeasonOptionController } from './season-option.controller';

describe('SeasonOption Controller', () => {
  let controller: SeasonOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeasonOptionController]
    }).compile();

    controller = module.get<SeasonOptionController>(SeasonOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
