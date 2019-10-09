import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { TournamentEntity } from './tournament.entity';

@Entity('tournament_options')
export class TournamentOptionsEntity {
  @OneToOne(() => TournamentEntity, tournament => tournament.options, {
    primary: true,
    nullable: false
  })
  @JoinColumn()
  public tournament: TournamentEntity;

  @Column()
  public startDate: Date;

  @Column()
  public checkInDate: Date;

  @Column()
  public minTeams: number;

  @Column()
  public maxTeams: number;
}
