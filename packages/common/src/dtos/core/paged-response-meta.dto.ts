import { DOCS_PAGED_RESPONSE_META } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { PaginationOptions } from './pagination-options.dto';

export class PagedResponseMeta {
  @ClashModelProperty(DOCS_PAGED_RESPONSE_META.PROPS.page)
  public page: number;

  @ClashModelProperty(DOCS_PAGED_RESPONSE_META.PROPS.pageSize)
  public pageSize: number;

  @ClashModelProperty(DOCS_PAGED_RESPONSE_META.PROPS.totalRecords)
  public totalRecords: number;

  @ClashModelProperty(DOCS_PAGED_RESPONSE_META.PROPS.hasNextPage)
  public get hasNextPage(): boolean {
    return this.page * this.pageSize < this.totalRecords;
  }

  constructor(options: PaginationOptions, totalRecords: number) {
    this.page = options.page;
    this.pageSize = options.pageSize;
    this.totalRecords = totalRecords;
  }
}
