import { ClashModelProperty } from '../../decorators';

export class CoreData {
  @ClashModelProperty({ type: 'integer' })
  public id: number;
}
