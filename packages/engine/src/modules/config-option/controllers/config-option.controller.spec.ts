import { Test, TestingModule } from '@nestjs/testing';
import { ConfigOptionController } from './config-option.controller';

describe('ConfigOption Controller', () => {
  let controller: ConfigOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigOptionController]
    }).compile();

    controller = module.get<ConfigOptionController>(ConfigOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
