import { Global, HttpModule, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [],
  imports: [HttpModule],
  exports: [HttpModule]
})
export class CoreModule {}
