import { ClashModelProperty } from '@clash/common';
import { DOCS_MATCH } from '../../../constants/api-docs.constant';

export class MatchUpdate {
  @ClashModelProperty(DOCS_MATCH.PROPS.winnerId)
  public winnerId: number;
}
