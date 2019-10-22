import { Column, ManyToOne } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { SeasonEntity } from '../../season/entities';

export class EloEntity extends CoreModifiableEntity {
  @ManyToOne(() => SeasonEntity, {
    nullable: false
  })
  public season: SeasonEntity;

  @Column({
    default: 0
  })
  public elo: number;
}
