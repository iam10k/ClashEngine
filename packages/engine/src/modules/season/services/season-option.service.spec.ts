import { Test, TestingModule } from '@nestjs/testing';
import { SeasonOptionService } from './season-option.service';

describe('SeasonOptionService', () => {
  let service: SeasonOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonOptionService]
    }).compile();

    service = module.get<SeasonOptionService>(SeasonOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
