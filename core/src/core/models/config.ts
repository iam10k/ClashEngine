import { BaseConfig } from '@clash/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsDefined, IsString } from 'class-validator';
import { ConnectionOptions } from 'typeorm';

export class Config extends BaseConfig {
  @Expose()
  @IsDefined()
  @IsString()
  public readonly url: string;

  @Expose()
  @IsDefined()
  public readonly databaseConfig: ConnectionOptions;

  @Expose()
  @IsBoolean()
  public readonly populateMockData?: boolean;

  @Exclude()
  get ormConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    let migrations = [__dirname + '/../../migrations/*{.ts,.js}'];

    if ((module as any).hot) {
      const entityContext = (require as any).context('./../../modules', true, /\.entity\.ts$/);
      entities = entityContext.keys().map(id => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (require as any).context('./../../migrations', false, /\.ts$/);
      migrations = migrationContext.keys().map(id => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }
    return {
      ...this.databaseConfig,
      entities,
      migrations
    };
  }
}
