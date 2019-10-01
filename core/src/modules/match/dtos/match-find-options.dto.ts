import { ClashModelPropertyOptional, PaginationOptions } from '@clash/common';
import { Transform, Type } from 'class-transformer';
import { isDate, parseISO } from 'date-fns';
import { DOCS_MATCH_FIND_OPTIONS } from '../../../constants/api-docs.constant';
import { MatchStatusType } from '../enums/match-status.type';
import { MatchType } from '../enums/match.type';

export class MatchFindOptions extends PaginationOptions {
  @ClashModelPropertyOptional(DOCS_MATCH_FIND_OPTIONS.PROPS.seasonId)
  @Type(() => Number)
  public seasonId: number;

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
