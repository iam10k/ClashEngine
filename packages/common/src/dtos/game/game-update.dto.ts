import { DOCS_GAME } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';

export class GameUpdate {
  @ClashModelPropertyOptional(DOCS_GAME.PROPS.name)
  public name: string;

  @ClashModelPropertyOptional(DOCS_GAME.PROPS.inactive)
  public inactive: boolean;
}
