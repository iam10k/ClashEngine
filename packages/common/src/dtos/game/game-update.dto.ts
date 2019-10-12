import { DOCS_GAME } from '../../constants';
import { ClashModelProperty, ClashModelPropertyOptional } from '../../decorators';

export class GameUpdate {
  @ClashModelPropertyOptional(DOCS_GAME.PROPS.name)
  public name: string;

  @ClashModelPropertyOptional(DOCS_GAME.PROPS.inactive)
  public inactive: boolean;

  @ClashModelProperty(DOCS_GAME.PROPS.teamCount)
  public teamCount: number;

  @ClashModelProperty(DOCS_GAME.PROPS.teamPlayers)
  public teamPlayers: number;
}
