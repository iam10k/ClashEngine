import { CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
import { UserCoreEntity } from '../../modules/user/core';
import { CoreDataEntity } from './core-data.entity';

export class CoreModifiableEntity extends CoreDataEntity {
  @CreateDateColumn()
  public createdAt: Date;

  @ManyToOne(() => UserCoreEntity)
  public createdBy: UserCoreEntity;

  @UpdateDateColumn()
  public updatedAt: Date;

  @ManyToOne(() => UserCoreEntity)
  public updatedBy: UserCoreEntity;
}
