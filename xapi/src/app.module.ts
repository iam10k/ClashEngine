import { ClashCoreModule, ConfigService } from '@clash/common';
import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { Config } from './core/models';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  providers: [],
  imports: [
    ClashCoreModule.forRoot({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService<Config>(Config)
        }
      ]
    }),
    CoreModule,
    AuthModule,
    UserModule
  ],
  exports: [ClashCoreModule]
})
export class AppModule {}
