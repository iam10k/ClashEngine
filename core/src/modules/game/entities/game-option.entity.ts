import { Column, Entity, ManyToOne } from 'typeorm';
import { ConfigOptionEntity } from '../../config-option/entities';
import { GameEntity } from './game.entity';

@Entity('game_option')
export class GameOptionEntity {
  @ManyToOne(() => GameEntity, game => game.options, {
    primary: true,
    nullable: false
  })
  public game: GameEntity;

  @ManyToOne(() => ConfigOptionEntity, {
    primary: true
  })
  public configOption: ConfigOptionEntity;

  @Column({
    default: false
  })
  public required: boolean;

  @Column()
  public default: string;
}
