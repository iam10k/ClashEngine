import { Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserCoreEntity } from '../../user/core';
import { MatchTeamEntity } from './match-team.entity';

@Entity('match_team_member')
export class MatchTeamMemberEntity {
  @ManyToOne(() => MatchTeamEntity, matchTeam => matchTeam.members, {
    primary: true,
    nullable: false
  })
  @JoinColumn()
  public team: MatchTeamEntity;

  @ManyToOne(() => UserCoreEntity, {
    primary: true,
    nullable: false
  })
  @JoinColumn()
  public user: UserCoreEntity;
}
