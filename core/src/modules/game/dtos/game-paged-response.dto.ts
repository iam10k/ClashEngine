import { ClashModelProperty, DOCS_PAGED_RESPONSE, PagedResponseMeta, PaginationOptions } from '@clash/common';
import { Type } from 'class-transformer';
import { DOCS_GAME_PAGED_RESPONSE } from '../../../constants/api-docs.constant';
import { Game } from './game.dto';

export class GamePagedResponse {
  @ClashModelProperty({ ...DOCS_GAME_PAGED_RESPONSE.PROPS.records, type: Game, isArray: true })
  @Type(() => Game)
  public records: Game[];

  @ClashModelProperty(DOCS_PAGED_RESPONSE.PROPS.meta)
  @Type(() => PagedResponseMeta)
  public meta: PagedResponseMeta;

  constructor(records: Game[], count: number, paginationOptions: PaginationOptions) {
    this.records = records;
    this.meta = new PagedResponseMeta(paginationOptions, count);
  }
}
