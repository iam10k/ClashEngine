import { Transform } from 'class-transformer';
import { endOfDay, isValid, parseISO, startOfDay } from 'date-fns';
import { DOCS_SEASON, DOCS_SEASON_CRE_UPD } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';

export class SeasonUpdate {
  @ClashModelPropertyOptional(DOCS_SEASON.PROPS.season)
  public season: number;

  @ClashModelPropertyOptional(DOCS_SEASON.PROPS.name)
  protected name: string;

  @ClashModelPropertyOptional(DOCS_SEASON_CRE_UPD.PROPS.startDate)
  @Transform(v => {
    const d: Date = parseISO(v);
    return isValid(d) ? startOfDay(d) : v;
  })
  public startDate: Date;

  @ClashModelPropertyOptional(DOCS_SEASON_CRE_UPD.PROPS.endDate)
  @Transform(v => {
    const d: Date = parseISO(v);
    return isValid(d) ? endOfDay(d) : v;
  })
  public endDate: Date;
}
