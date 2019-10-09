import { Check, Column, Entity, ManyToOne, OneToMany, RelationId, Unique } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';
import { GameEntity } from '../../game/entities';
import { SeasonOptionEntity } from './season-option.entity';

@Entity('season')
@Unique(['game', 'season'])
@Check(`"startDate" < "endDate"`)
export class SeasonEntity extends CoreDataEntity {
  @ManyToOne(() => GameEntity, game => game.seasons, {
    nullable: false
  })
  public game: GameEntity;

  @RelationId((season: SeasonEntity) => season.game)
  public gameId: number;

  @Column()
  public season: number;

  @Column({
    length: 64
  })
  public name: string;

  @Column()
  public startDate: Date;

  @Column()
  public endDate: Date;

  @OneToMany(() => SeasonOptionEntity, option => option.season)
  public options: SeasonOptionEntity[];
}
