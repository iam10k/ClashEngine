import { Type } from 'class-transformer';
import { DOCS_SEASON } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { Game } from '../game';
import { SeasonOption } from './season-option.dto';
import { Season } from './season.dto';

export class SeasonDetailed extends Season {
  @ClashModelProperty({ ...DOCS_SEASON.PROPS.options, type: SeasonOption, isArray: true })
  @Type(() => SeasonOption)
  public options: SeasonOption[];

  @ClashModelProperty(DOCS_SEASON.PROPS.game)
  @Type(() => Game)
  public game: Game;
}
