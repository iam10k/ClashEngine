import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user')
export class UserDetailEntity extends UserEntity {
  @Column({
    length: 256,
    nullable: true
  })
  public email: string;

  @Column({
    default: false,
    nullable: true
  })
  public registered: boolean;

  @Column({
    nullable: true
  })
  public roles: number;

  @CreateDateColumn({
    select: false
  })
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  setRegistered() {
    if (this.username) {
      this.registered = true;
    }
  }
}
