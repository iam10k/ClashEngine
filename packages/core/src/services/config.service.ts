import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { validateSync, ValidationError } from 'class-validator';
import * as fs from 'fs';
import { BaseConfig } from '../models';

@Injectable()
export class ConfigService<T extends BaseConfig> {
  private readonly LOG = new Logger(ConfigService.name);

  private CONFIG_PATH = process.env.CN_CONFIG_PATH || './config/config.json';

  private _config: T;

  constructor(cls: ClassType<T>) {
    this.loadConfig(cls);
    this.LOG.log(`ConfigService<${cls.name}> registered`);
  }

  get config(): T {
    if (!this._config) {
      throw new Error('Config not initialized, use a factory provider to initialize with .initializeApp()');
    }
    return this._config;
  }

  private loadConfig(cls: ClassType<T>): void {
    let rawConfig: string;
    try {
      rawConfig = fs.readFileSync(this.CONFIG_PATH, 'utf8');
    } catch (e) {
      throw new Error(`Config not found at '${this.CONFIG_PATH}', application startup halted!`);
    }

    const parsedObj: any = JSON.parse(rawConfig);
    const configObj = plainToClass(cls, parsedObj);
    if (!parsedObj || !configObj) {
      throw new Error('Config could not be parsed, validate the config and JSON format.');
    }

    const validationErrors: ValidationError[] = validateSync(configObj);
    if (validationErrors && validationErrors.length > 0) {
      throw new Error('Config is not valid. Invalid properties:\n' + validationErrors);
    }

    this._config = configObj;
  }
}
