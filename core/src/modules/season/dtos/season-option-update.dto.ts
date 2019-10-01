import { ClashModelProperty } from '@clash/common';
import { DOCS_SEASON_OPTION } from '../../../constants/api-docs.constant';

export class SeasonOptionUpdate {
  @ClashModelProperty(DOCS_SEASON_OPTION.PROPS.value)
  public value: string;
}
