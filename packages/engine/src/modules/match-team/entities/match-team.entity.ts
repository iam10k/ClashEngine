import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { MatchEntity } from '../../match/entities';
import { MatchTeamMemberEntity } from './match-team-member.entity';

@Entity('match_team')
export class MatchTeamEntity extends CoreDataEntity {
  @ManyToOne(() => MatchEntity, match => match.teams)
  @JoinColumn()
  public match: MatchEntity;

  @RelationId((matchTeam: MatchTeamEntity) => matchTeam.match)
  public matchId: number;

  @ManyToOne(() => MatchTeamMemberEntity, teamMember => teamMember.team)
  public members: MatchTeamMemberEntity[];

  @RelationId((matchTeam: MatchTeamEntity) => matchTeam.members)
  public memberIds: number[];

  @Column({
    nullable: true
  })
  public score: number;
}
