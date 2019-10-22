import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_ENTITIES } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature(DB_ENTITIES)]
})
export class RegionModule {
}
