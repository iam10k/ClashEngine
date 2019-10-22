import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { SeasonEntity } from '../../season/entities';
import { TournamentMatchEntity } from './tournament-match.entity';
import { TournamentOptionsEntity } from './tournament-options.entity';
import { TournamentTeamEntity } from './tournament-team.entity';

@Entity('tournament')
export class TournamentEntity extends CoreModifiableEntity {
  @Column({
    length: 64
  })
  public name: string;

  @ManyToOne(() => SeasonEntity)
  public season: SeasonEntity;

  @OneToOne(() => TournamentOptionsEntity, options => options.tournament, {
    cascade: true
  })
  public options: TournamentOptionsEntity;

  @OneToMany(() => TournamentTeamEntity, tournamentTeam => tournamentTeam.tournament)
  public teams: TournamentTeamEntity[];

  @OneToMany(() => TournamentMatchEntity, match => match.tournament)
  public matches: TournamentMatchEntity[];
}
