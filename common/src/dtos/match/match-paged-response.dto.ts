import { Type } from 'class-transformer';
import { DOCS_GAME_PAGED_RESPONSE, DOCS_PAGED_RESPONSE } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { PagedResponseMeta, PaginationOptions } from '../core';
import { Match } from './match.dto';

export class MatchPagedResponse {
  @ClashModelProperty({ ...DOCS_GAME_PAGED_RESPONSE.PROPS.records, type: Match, isArray: true })
  @Type(() => Match)
  public records: Match[];

  @ClashModelProperty(DOCS_PAGED_RESPONSE.PROPS.meta)
  @Type(() => PagedResponseMeta)
  public meta: PagedResponseMeta;

  constructor(records: Match[], count: number, paginationOptions: PaginationOptions) {
    this.records = records;
    this.meta = new PagedResponseMeta(paginationOptions, count);
  }
}
