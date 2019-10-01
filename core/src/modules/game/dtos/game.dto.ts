import { ArrayUtil, ClashModelProperty, CoreUpdatableData } from '@clash/common';
import { Exclude, Expose, Type } from 'class-transformer';
import { DOCS_GAME } from '../../../constants/api-docs.constant';
import { Season } from '../../season/dtos/season.dto';

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

  @ClashModelProperty(DOCS_GAME.PROPS.currentSeason)
  get currentSeason(): Season {
    const date: Date = new Date();
    return ArrayUtil.isEmpty(this.seasons)
      ? null
      : this.seasons.find(season => season.startDate <= date && season.endDate >= date);
  }
}
