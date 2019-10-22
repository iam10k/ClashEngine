import { CreateDateColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserCoreEntity } from '../../modules/user/core';
import { CoreModifiableEntity } from './core-modifiable.entity';

export class CoreDataEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
