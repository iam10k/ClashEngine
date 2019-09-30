import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { MatchEntity } from '../../match/entities';
import { MatchTeamMemberEntity } from './match-team-member.entity';

@Entity('match_team')
export class MatchTeamEntity extends CoreDataEntity {
  @ManyToOne(() => MatchEntity, match => match.teams)
  @JoinColumn()
  public match: MatchEntity;

  @ManyToOne(() => MatchTeamMemberEntity, teamMember => teamMember.team)
  public members: MatchTeamMemberEntity[];

  @Column()
  public score: number;
}
