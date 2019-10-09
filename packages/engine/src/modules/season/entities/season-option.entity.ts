import { Column, Entity, ManyToOne } from 'typeorm';
import { ConfigOptionEntity } from '../../config-option/entities';
import { SeasonEntity } from './season.entity';

@Entity('season_option')
export class SeasonOptionEntity {
  @ManyToOne(() => SeasonEntity, season => season.options, {
    primary: true,
    nullable: false
  })
  public season: SeasonEntity;

  @ManyToOne(() => ConfigOptionEntity, {
    primary: true
  })
  public configOption: ConfigOptionEntity;

  @Column()
  public value: string;
}
