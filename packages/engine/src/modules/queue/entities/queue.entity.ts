import { Column, Entity, ManyToOne } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { GameEntity } from '../../game/entities';
import { RegionEntity } from '../../region/entities';
import { QueuePlayerEntity } from './queue-player.entity';

@Entity('queue')
export class QueueEntity extends CoreDataEntity {
  @ManyToOne(() => GameEntity, game => game.queues)
  public game: GameEntity;

  @ManyToOne(() => RegionEntity)
  public region: RegionEntity;

  @Column({
    default: false
  })
  public enabled: boolean;

  @ManyToOne(() => QueuePlayerEntity, queuePlayer => queuePlayer.queue)
  public players: QueuePlayerEntity[];
}
