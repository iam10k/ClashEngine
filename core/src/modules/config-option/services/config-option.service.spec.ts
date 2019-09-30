import { Test, TestingModule } from '@nestjs/testing';
import { ConfigOptionService } from './config-option.service';

describe('ConfigOptionService', () => {
  let service: ConfigOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigOptionService]
    }).compile();

    service = module.get<ConfigOptionService>(ConfigOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
