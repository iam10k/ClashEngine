import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { MatchEntity } from '../../match/entities';
import { MatchTeamMemberEntity } from './match-team-member.entity';

@Entity('match_team')
export class MatchTeamEntity extends CoreModifiableEntity {
  @ManyToOne(() => MatchEntity, match => match.teams)
  public match: MatchEntity;

  @RelationId((matchTeam: MatchTeamEntity) => matchTeam.match)
  public matchId: number;

  @OneToMany(() => MatchTeamMemberEntity, teamMember => teamMember.team)
  public members: MatchTeamMemberEntity[];

  @Column({
    nullable: true
  })
  public score: number;

  @Column({
    nullable: true
  })
  public elo: number;

  @Column({
    nullable: true
  })
  public adjustedElo: number;
}
