import { Column, ManyToOne } from 'typeorm';
import { CoreModifiableEntity } from '../../../core/entities';
import { RegionEntity } from '../../region/entities';
import { SeasonEntity } from '../../season/entities';

export class EloEntity extends CoreModifiableEntity {
  @ManyToOne(() => SeasonEntity, {
    nullable: false
  })
  public season: SeasonEntity;

  @ManyToOne(() => RegionEntity, {
    nullable: false
  })
  public region: RegionEntity;

  @Column({
    type: 'numeric',
    default: 0
  })
  public elo: number;
}
