import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('region')
export class RegionEntity {
  @PrimaryColumn()
  public key: string;

  @Column()
  public name: string;

  @Column()
  public iso2: string;

  @Column({
    default: false
  })
  public enabled: boolean;
}
