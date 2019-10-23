import { ClashCoreModule, ConfigService } from '@clash/core';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from './core/core.module';
import { Config } from './core/models';
import { ConfigOptionModule } from './modules/config-option/config-option.module';
import { EloModule } from './modules/elo/elo.module';
import { GameModule } from './modules/game/game.module';
import { MatchTeamModule } from './modules/match-team/match-team.module';
import { MatchModule } from './modules/match/match.module';
import { QueueModule } from './modules/queue/queue.module';
import { RegionModule } from './modules/region/region.module';
import { SeasonModule } from './modules/season/season.module';
import { TeamModule } from './modules/team/team.module';
import { TournamentModule } from './modules/tournament/tournament.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ClashCoreModule.forRoot({
      providers: [
        {
          provide: ConfigService,
          useValue: new ConfigService<Config>(Config)
        }
      ]
    }),
    TypeOrmModule.forRootAsync({
      imports: [CoreModule],
      useFactory: (configService: ConfigService<Config>) => configService.config.ormConfig,
      inject: [ConfigService]
    }),
    CoreModule,
    UserModule,
    ConfigOptionModule,
    GameModule,
    SeasonModule,
    MatchModule,
    TeamModule,
    TournamentModule,
    EloModule,
    MatchTeamModule,
    QueueModule,
    RegionModule
  ]
})
export class AppModule {}
