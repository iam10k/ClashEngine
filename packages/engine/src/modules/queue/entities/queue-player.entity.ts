import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { UserEloEntity } from '../../elo/entities';
import { UserEntity } from '../../user/entities';
import { QueueEntity } from './queue.entity';

@Entity('queue_player')
export class QueuePlayerEntity extends CoreDataEntity {
  @OneToOne(() => QueueEntity, queue => queue.players)
  @JoinColumn()
  public queue: QueueEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  public user: UserEntity;

  @OneToOne(() => QueueEntity)
  @JoinColumn()
  public elo: UserEloEntity;
}
