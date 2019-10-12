import { Exclude, Expose, Type } from 'class-transformer';
import { DOCS_GAME } from '../../constants';
import { ClashModelProperty, ClashModelPropertyOptional } from '../../decorators';
import { ArrayUtil } from '../../utils';
import { CoreUpdatableData } from '../core';
import { Season } from '../season';

export class Game extends CoreUpdatableData {
  @ClashModelProperty(DOCS_GAME.PROPS.name)
  public name: string;

  @ClashModelProperty(DOCS_GAME.PROPS.inactive)
  public inactive: boolean;

  @ClashModelProperty(DOCS_GAME.PROPS.image)
  public image: string;

  @Expose({ toClassOnly: true })
  @Exclude({ toPlainOnly: true })
  @Type(() => Season)
  public seasons: Season[];

  @ClashModelProperty(DOCS_GAME.PROPS.teamCount)
  public teamCount: number;

  @ClashModelProperty(DOCS_GAME.PROPS.teamPlayers)
  public teamPlayers: number;

  @ClashModelPropertyOptional(DOCS_GAME.PROPS.currentSeason)
  get currentSeason(): Season {
    const date: Date = new Date();
    if (ArrayUtil.isEmpty(this.seasons)) {
      return undefined;
    }
    return this.seasons.find(season => season.startDate <= date && season.endDate >= date) || null;
  }
}
