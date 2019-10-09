import { ClashCoreModule } from '@clash/core';
import { Global, HttpModule, Module } from '@nestjs/common';
import { DatabaseService } from './services';

@Global()
@Module({
  providers: [DatabaseService],
  imports: [ClashCoreModule, HttpModule],
  exports: [HttpModule]
})
export class CoreModule {}
