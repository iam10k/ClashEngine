import { Transform } from 'class-transformer';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { DOCS_SEASON, DOCS_SEASON_CRE_UPD } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class SeasonCreate {
  @ClashModelProperty(DOCS_SEASON.PROPS.season)
  public season: number;

  @ClashModelProperty(DOCS_SEASON.PROPS.name)
  public name: string;

  @ClashModelProperty(DOCS_SEASON_CRE_UPD.PROPS.startDate)
  @Transform(v => {
    const d: Date = parseISO(v);
    return isValid(d) ? startOfDay(d) : v;
  })
  public startDate: Date;

  @ClashModelProperty(DOCS_SEASON_CRE_UPD.PROPS.endDate)
  @Transform(v => {
    const d: Date = parseISO(v);
    return isValid(d) ? endOfDay(d) : v;
  })
  public endDate: Date;
}
