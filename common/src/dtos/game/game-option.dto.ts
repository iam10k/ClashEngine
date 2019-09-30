import { DOCS_GAME_OPTION } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { ConfigOption } from '../config-option';

export class GameOption {
  @ClashModelProperty({ ...DOCS_GAME_OPTION.PROPS.configOption, type: ConfigOption })
  public configOption: ConfigOption;

  @ClashModelProperty(DOCS_GAME_OPTION.PROPS.required)
  public required: boolean;

  @ClashModelProperty(DOCS_GAME_OPTION.PROPS.default)
  public default: string;
}
