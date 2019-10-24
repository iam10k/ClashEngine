import { DOCS_QUEUE } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class Queue {
  @ClashModelProperty(DOCS_QUEUE.PROPS.gameId)
  public gameId: number;

  @ClashModelProperty(DOCS_QUEUE.PROPS.regionKey)
  public regionKey: string;

  @ClashModelProperty(DOCS_QUEUE.PROPS.enabled)
  public enabled: boolean;
}
