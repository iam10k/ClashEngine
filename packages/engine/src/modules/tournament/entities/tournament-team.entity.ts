import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { TeamEntity } from '../../team/entities';
import { TournamentEntity } from './tournament.entity';

@Entity('tournament_team')
@Unique(['tournament', 'team'])
export class TournamentTeamEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => TournamentEntity, tournament => tournament.teams)
  @JoinColumn()
  public tournament: TournamentEntity;

  @ManyToOne(() => TeamEntity, team => team.tournaments)
  @JoinColumn()
  public team: TeamEntity;

  @Column({
    nullable: true
  })
  public seed: number;
}
