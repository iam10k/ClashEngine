import { Test, TestingModule } from '@nestjs/testing';
import { BaseConfig } from '../models';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  let service: ConfigService<BaseConfig>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfigService]
    }).compile();

    service = module.get<ConfigService<BaseConfig>>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
