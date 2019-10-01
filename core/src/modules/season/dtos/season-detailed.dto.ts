import { ClashModelProperty } from '@clash/common';
import { Type } from 'class-transformer';
import { DOCS_SEASON } from '../../../constants/api-docs.constant';
import { SeasonOption } from './season-option.dto';
import { Season } from './season.dto';

export class SeasonDetailed extends Season {
  @ClashModelProperty({ ...DOCS_SEASON.PROPS.options, type: SeasonOption, isArray: true })
  @Type(() => SeasonOption)
  public options: SeasonOption[];
}
