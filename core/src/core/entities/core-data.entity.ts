import { PrimaryGeneratedColumn } from 'typeorm';
import { CoreModifiableEntity } from './core-modifiable.entity';

export class CoreDataEntity extends CoreModifiableEntity {
  @PrimaryGeneratedColumn()
  public id: number;
}
