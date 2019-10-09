import { TournamentMatchEntity } from './tournament-match.entity';
import { TournamentOptionsEntity } from './tournament-options.entity';
import { TournamentTeamEntity } from './tournament-team.entity';
import { TournamentEntity } from './tournament.entity';

export const DB_ENTITIES = [TournamentEntity, TournamentMatchEntity, TournamentOptionsEntity, TournamentTeamEntity];

export * from './tournament.entity';
export * from './tournament-match.entity';
export * from './tournament-options.entity';
export * from './tournament-team.entity';
