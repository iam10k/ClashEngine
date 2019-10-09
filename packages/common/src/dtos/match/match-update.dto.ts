import { DOCS_MATCH } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class MatchUpdate {
  @ClashModelProperty(DOCS_MATCH.PROPS.winnerId)
  public winnerId: number;
}
