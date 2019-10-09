import { ConfigService } from '@clash/core';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { EntityManager, getManager } from 'typeorm';
import { Config } from '../models';

@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(@Inject(ConfigService) private readonly config: ConfigService<Config>) {}

  onModuleInit(): any {
    if (this.config.config.populateMockData) {
      this.populateMockData();
    }
  }

  private async populateMockData(): Promise<void> {
    const manager: EntityManager = getManager();
    const mocks = require('../../mocks/db-mocks');
    for (const entity of mocks.ENTITIES) {
      await manager.save(entity);
    }
  }
}
