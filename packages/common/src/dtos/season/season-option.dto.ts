import { Type } from 'class-transformer';
import { DOCS_SEASON_OPTION } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { ConfigOption } from '../config-option';

export class SeasonOption {
  @ClashModelProperty({ ...DOCS_SEASON_OPTION.PROPS.configOption, type: ConfigOption })
  @Type(() => ConfigOption)
  public configOption: ConfigOption;

  @ClashModelProperty(DOCS_SEASON_OPTION.PROPS.value)
  public value: string;
}
