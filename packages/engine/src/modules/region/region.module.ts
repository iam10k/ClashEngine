import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_ENTITIES } from './entities';
import { RegionService } from './services/region.service';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)],
  providers: [RegionService]
})
export class RegionModule {}
