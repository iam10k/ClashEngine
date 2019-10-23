import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { GameEntity } from '../../game/entities';
import { RegionEntity } from '../../region/entities';
import { QueuePlayerEntity } from './queue-player.entity';

@Entity('queue')
export class QueueEntity extends CoreDataEntity {
  @ManyToOne(() => GameEntity, game => game.queues)
  public game: GameEntity;

  @RelationId((queue: QueueEntity) => queue.game)
  public gameId: number;

  @ManyToOne(() => RegionEntity)
  public region: RegionEntity;

  @RelationId((queue: QueueEntity) => queue.region)
  public regionKey: string;

  @Column({
    default: false
  })
  public enabled: boolean;

  @OneToMany(() => QueuePlayerEntity, queuePlayer => queuePlayer.queue)
  public players: QueuePlayerEntity[];
}
