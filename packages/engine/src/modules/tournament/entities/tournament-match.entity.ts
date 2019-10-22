import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { TournamentTeamEntity } from './tournament-team.entity';
import { TournamentEntity } from './tournament.entity';

@Entity('tournament_match')
export class TournamentMatchEntity extends CoreDataEntity {
  @ManyToOne(() => TournamentEntity, tournament => tournament.matches, {
    nullable: false
  })
  @JoinColumn()
  public tournament: TournamentEntity;

  @Column()
  public round: number;

  @ManyToOne(() => TournamentTeamEntity)
  public winner: TournamentTeamEntity;

  @ManyToMany(() => TournamentTeamEntity)
  @JoinTable({
    name: 'tournament_match_team'
  })
  public teams: TournamentTeamEntity[];
}
