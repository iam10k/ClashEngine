import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { UserEntity } from './user.entity';

@Entity('username_history')
export class UsernameHistoryEntity extends CoreDataEntity {
  @Column({
    length: 32,
    unique: false,
    nullable: true
  })
  public username: string;

  @ManyToOne(() => UserEntity, user => user.usernameHistory)
  public user: UserEntity;

  @RelationId((usernameHistory: UsernameHistoryEntity) => usernameHistory.user)
  public userId: number;
}
