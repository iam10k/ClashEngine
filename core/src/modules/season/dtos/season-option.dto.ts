import { ClashModelProperty } from '@clash/common';
import { Type } from 'class-transformer';
import { DOCS_SEASON_OPTION } from '../../../constants/api-docs.constant';
import { ConfigOption } from '../../config-option/dtos/config-option.dto';

export class SeasonOption {
  @ClashModelProperty({ ...DOCS_SEASON_OPTION.PROPS.configOption, type: ConfigOption })
  @Type(() => ConfigOption)
  public configOption: ConfigOption;

  @ClashModelProperty(DOCS_SEASON_OPTION.PROPS.value)
  public value: string;
}
