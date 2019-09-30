import { DOCS_GAME_OPTION } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';

export class GameOptionUpdate {
  @ClashModelPropertyOptional(DOCS_GAME_OPTION.PROPS.required)
  public required: boolean;

  @ClashModelPropertyOptional(DOCS_GAME_OPTION.PROPS.default)
  public default: string;
}
