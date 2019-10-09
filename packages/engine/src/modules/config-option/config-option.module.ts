import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigOptionController } from './controllers/config-option.controller';
import { DB_ENTITIES } from './entities';
import { ConfigOptionService } from './services/config-option.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  providers: [ConfigOptionService],
  controllers: [ConfigOptionController]
})
export class ConfigOptionModule {}
