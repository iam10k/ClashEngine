import { DOCS_GAME } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class GameCreate {
  @ClashModelProperty(DOCS_GAME.PROPS.name)
  public name: string;

  @ClashModelProperty(DOCS_GAME.PROPS.teamCount)
  public teamCount: number;

  @ClashModelProperty(DOCS_GAME.PROPS.teamPlayers)
  public teamPlayers: number;
}
