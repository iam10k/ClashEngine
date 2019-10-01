import { ClashModelProperty, CoreUpdatableData } from '@clash/common';
import { Type } from 'class-transformer';
import { DOCS_SEASON } from '../../../constants/api-docs.constant';

export class Season extends CoreUpdatableData {
  @ClashModelProperty(DOCS_SEASON.PROPS.season)
  public season: number;

  @ClashModelProperty(DOCS_SEASON.PROPS.name)
  public name: string;

  @ClashModelProperty(DOCS_SEASON.PROPS.startDate)
  @Type(() => Date)
  public startDate: Date;

  @ClashModelProperty(DOCS_SEASON.PROPS.endDate)
  @Type(() => Date)
  public endDate: Date;
}
