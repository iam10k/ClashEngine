import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TournamentTeamEntity } from './tournament-team.entity';
import { TournamentEntity } from './tournament.entity';

@Entity('tournament_match')
export class TournamentMatchEntity {
  @PrimaryGeneratedColumn()
  public id: number;

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
