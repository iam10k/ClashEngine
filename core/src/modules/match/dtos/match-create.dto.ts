import { ClashModelProperty } from '@clash/common';
import { DOCS_MATCH } from '../../../constants/api-docs.constant';
import { MatchType } from '../enums/match.type';

export class MatchCreate {
  @ClashModelProperty(DOCS_MATCH.PROPS.type)
  public type: MatchType;
}
