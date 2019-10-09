import { DOCS_MATCH } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { MatchType } from '../../enums';

export class MatchCreate {
  @ClashModelProperty(DOCS_MATCH.PROPS.type)
  public type: MatchType;
}
