import { MatchTeamMemberStatusType } from '@clash/common';
import { Column, Entity, JoinColumn, ManyToOne, RelationId, Unique } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { UserEntity } from '../../user/entities';
import { MatchTeamEntity } from './match-team.entity';

@Entity('match_team_member')
@Unique(['team', 'user'])
export class MatchTeamMemberEntity extends CoreDataEntity {
  @ManyToOne(() => MatchTeamEntity, matchTeam => matchTeam.members, {
    nullable: false
  })
  @JoinColumn()
  public team: MatchTeamEntity;

  @ManyToOne(() => UserEntity, {
    nullable: false
  })
  @JoinColumn()
  public user: UserEntity;

  @RelationId((teamMember: MatchTeamMemberEntity) => teamMember.user)
  public userId: number;

  @Column({
    type: 'enum',
    enum: MatchTeamMemberStatusType,
    nullable: false,
    default: MatchTeamMemberStatusType.PENDING
  })
  public status: MatchTeamMemberStatusType;
}
