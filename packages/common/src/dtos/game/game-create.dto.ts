import { DOCS_GAME } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class GameCreate {
  @ClashModelProperty(DOCS_GAME.PROPS.name)
  public name: string;
}
