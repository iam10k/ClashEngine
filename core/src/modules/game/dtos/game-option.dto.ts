import { ClashModelProperty } from '@clash/common';
import { DOCS_GAME_OPTION } from '../../../constants/api-docs.constant';
import { ConfigOption } from '../../config-option/dtos/config-option.dto';

export class GameOption {
  @ClashModelProperty({ ...DOCS_GAME_OPTION.PROPS.configOption, type: ConfigOption })
  public configOption: ConfigOption;

  @ClashModelProperty(DOCS_GAME_OPTION.PROPS.required)
  public required: boolean;

  @ClashModelProperty(DOCS_GAME_OPTION.PROPS.default)
  public default: string;
}
