import { DOCS_SEASON_OPTION } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class SeasonOptionUpdate {
  @ClashModelProperty(DOCS_SEASON_OPTION.PROPS.value)
  public value: string;
}
