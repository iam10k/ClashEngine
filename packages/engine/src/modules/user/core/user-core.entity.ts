import { Column, Entity, Index } from 'typeorm';
import { CoreDataEntity } from '../../../core/entities';

@Entity('user')
export class UserCoreEntity extends CoreDataEntity {
  @Column({
    nullable: true,
    length: 32
  })
  public username: string;

  @Index()
  @Column({
    unique: true
  })
  public discordId: string;

  @Column({
    nullable: true
  })
  public avatar: string;

  @Column({
    nullable: true
  })
  public flags: number;
}
