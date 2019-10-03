import { ConfigService } from '@clash/common';
import { Inject, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import * as httpProxy from 'http-proxy-middleware';
import { API_PROXY_PATHS_CONST } from '../constants/api-proxy.constant';
import { Config } from '../core/models';

@Module({})
export class ProxyModule implements NestModule {
  constructor(@Inject(ConfigService) private readonly config: ConfigService<Config>) {}

  configure(consumer: MiddlewareConsumer): any {
    API_PROXY_PATHS_CONST.forEach(path => {
      const proxyOptions: httpProxy.Config = {
        target: this.config.config.coreUrl
      };
      // FUTURE: Modify headers to add oauth and move user auth
      consumer.apply(httpProxy(path, proxyOptions)).forRoutes('*');
    });
  }
}
