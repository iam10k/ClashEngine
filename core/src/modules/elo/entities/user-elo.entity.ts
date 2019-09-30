import { Entity, ManyToOne, Unique } from 'typeorm';
import { UserCoreEntity } from '../../user/core';
import { EloEntity } from './elo.entity';

@Entity('user_elo')
@Unique(['user', 'season'])
export class UserEloEntity extends EloEntity {
  @ManyToOne(() => UserCoreEntity, {
    nullable: false
  })
  public user: UserCoreEntity;
}
