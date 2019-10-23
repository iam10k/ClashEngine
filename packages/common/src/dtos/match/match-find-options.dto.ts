import { Transform, Type } from 'class-transformer';
import { isDate, parseISO } from 'date-fns';
import { DOCS_MATCH_FIND_OPTIONS } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';
import { MatchStatusType, MatchType } from '../../enums';
import { PaginationOptions } from '../core';

export class MatchFindOptions extends PaginationOptions {
  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.seasonId)
  @Type(() => Number)
  public seasonId: number;

  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.region)
  @Transform(v => (v ? (v instanceof Array ? v : [v]) : undefined))
  public region: string[];

  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.fromDate)
  @Transform(v => (isDate(v) ? v : v ? parseISO(v) : undefined))
  public fromDate: Date;

  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.toDate)
  @Transform(v => (isDate(v) ? v : v ? parseISO(v) : undefined))
  public toDate: Date;

  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.type)
  @Transform(v => (v ? (v instanceof Array ? v : [v]) : undefined))
  public type: MatchType[];

  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.status)
  @Transform(v => (v ? (v instanceof Array ? v : [v]) : undefined))
  public status: MatchStatusType[];
}
