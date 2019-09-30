import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('config_option')
export class ConfigOptionEntity {
  @PrimaryColumn({
    length: 10
  })
  public key: string;

  @Column()
  public description: string;
}
