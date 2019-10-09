import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserCoreEntity {
  @PrimaryGeneratedColumn()
  public id: number;

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
