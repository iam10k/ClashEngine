import { Column, Entity, OneToMany } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { SeasonEntity } from '../../season/entities';
import { GameOptionEntity } from './game-option.entity';

@Entity('game')
export class GameEntity extends CoreDataEntity {
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

  @OneToMany(() => SeasonEntity, season => season.game)
  public seasons: SeasonEntity[];

  @OneToMany(() => GameOptionEntity, option => option.game)
  public options: GameOptionEntity[];
}
