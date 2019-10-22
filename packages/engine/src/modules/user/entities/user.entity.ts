import { Entity, JoinTable, OneToMany } from 'typeorm';
import { UserEloEntity } from '../../elo/entities';
import { TeamMemberEntity } from '../../team/entities';
import { UserCoreEntity } from '../core';
import { UsernameHistoryEntity } from './username-history.entity';

@Entity('user')
export class UserEntity extends UserCoreEntity {
  @OneToMany(() => TeamMemberEntity, teamMember => teamMember.user)
  public teams: TeamMemberEntity[];

  @OneToMany(() => UsernameHistoryEntity, usernameHistory => usernameHistory.user)
  @JoinTable()
  public usernameHistory: UsernameHistoryEntity[];

  @OneToMany(() => UserEloEntity, userElo => userElo.user)
  @JoinTable()
  public elo: UserEloEntity[];
}
