import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { QueueEntity } from '../../queue/entities';
import { SeasonEntity } from '../../season/entities';
import { GameOptionEntity } from './game-option.entity';

@Entity('game')
export class GameEntity extends CoreModifiableEntity {
  @Column({
    unique: true,
    length: 64
  })
  public name: string;

  @Column({
    default: false
  })
  public inactive: boolean;

  @Column({
    nullable: true
  })
  public image: string;

  @OneToOne(() => SeasonEntity, season => season.game)
  @JoinColumn()
  public currentSeason: SeasonEntity;

  @OneToMany(() => SeasonEntity, season => season.game)
  public seasons: SeasonEntity[];

  @OneToMany(() => GameOptionEntity, option => option.game)
  public options: GameOptionEntity[];

  @OneToMany(() => QueueEntity, queue => queue.game)
  public queues: QueueEntity[];

  @Column()
  public teamCount: number;

  @Column()
  public teamPlayers: number;
}
