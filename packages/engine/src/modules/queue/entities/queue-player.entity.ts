import { Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { UserEloEntity } from '../../elo/entities';
import { UserEntity } from '../../user/entities';
import { QueueEntity } from './queue.entity';

@Entity('queue_player')
export class QueuePlayerEntity extends CoreDataEntity {
  @ManyToOne(() => QueueEntity, queue => queue.players)
  @JoinColumn()
  public queue: QueueEntity;

  @ManyToOne(() => UserEntity)
  @JoinColumn()
  public user: UserEntity;

  @RelationId((queuePlayer: QueuePlayerEntity) => queuePlayer.user)
  public userId: number;

  @ManyToOne(() => UserEloEntity)
  @JoinColumn()
  public elo: UserEloEntity;
}
