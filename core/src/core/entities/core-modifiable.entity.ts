import { CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { UserCoreEntity } from '../../modules/user/core';

export class CoreModifiableEntity {
  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(() => UserCoreEntity)
  public createdBy: UserCoreEntity;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => UserCoreEntity)
  public updatedBy: UserCoreEntity;
}
