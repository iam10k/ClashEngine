import { ClashModelProperty } from '../../decorators';
import { PatchAction } from '../../enums';

export class QueuePlayerUpdate {
  @ClashModelProperty()
  public userId: number;

  @ClashModelProperty()
  public action: PatchAction;
}
