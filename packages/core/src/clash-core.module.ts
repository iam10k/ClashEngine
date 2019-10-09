import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { JwtStrategy } from './passport';
import { JwtTokenService } from './services';

@Global()
@Module({})
export class ClashCoreModule {
  static forFeature(options?: { providers: Provider[] }): DynamicModule {
    const providers = options && options.providers ? options.providers : [];
    return {
      module: ClashCoreModule,
      providers: [...providers, JwtTokenService, JwtStrategy],
      exports: [...providers, JwtTokenService, JwtStrategy]
    };
  }
  static forRoot(options?: { providers: Provider[] }): DynamicModule {
    const providers = options && options.providers ? options.providers : [];
    return {
      module: ClashCoreModule,
      providers: [...providers, JwtTokenService, JwtStrategy],
      exports: [...providers, JwtTokenService, JwtStrategy]
    };
  }
}
