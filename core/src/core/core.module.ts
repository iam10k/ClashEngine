import { Global, HttpModule, Module } from '@nestjs/common';
import { DatabaseService } from './services';
import { ClashCoreModule } from '@clash/common';

@Global()
@Module({
  providers: [DatabaseService],
  imports: [ClashCoreModule, HttpModule],
  exports: [HttpModule]
})
export class CoreModule {}
