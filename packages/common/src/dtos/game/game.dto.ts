import { Type } from 'class-transformer';
import { DOCS_GAME } from '../../constants';
import { ClashModelProperty, ClashModelPropertyOptional } from '../../decorators';
import { CoreUpdatableData } from '../core';
import { Season } from '../season';

export class Game extends CoreUpdatableData {
  @ClashModelProperty(DOCS_GAME.PROPS.name)
  public name: string;

  @ClashModelProperty(DOCS_GAME.PROPS.inactive)
  public inactive: boolean;

  @ClashModelProperty(DOCS_GAME.PROPS.image)
  public image: string;

  @ClashModelProperty(DOCS_GAME.PROPS.teamCount)
  public teamCount: number;

  @ClashModelProperty(DOCS_GAME.PROPS.teamPlayers)
  public teamPlayers: number;

  @ClashModelPropertyOptional(DOCS_GAME.PROPS.currentSeason)
  @Type(() => Season)
  public currentSeason: Season;
}
