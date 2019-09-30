import { Exclude, Expose, Type } from 'class-transformer';
import { CoreData } from './core-data.dto';

export class CoreUpdatableData extends CoreData {
  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  @Type(() => Date)
  public updatedAt: Date;
}
