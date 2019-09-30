import { Type } from 'class-transformer';
import { DOCS_PAGED_RESPONSE, DOCS_USER_PAGED_RESPONSE } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { PagedResponseMeta, PaginationOptions, UserCore } from '../core';

export class UserPagedResponse {
  @ClashModelProperty({ ...DOCS_USER_PAGED_RESPONSE.PROPS.records, type: UserCore, isArray: true })
  @Type(() => UserCore)
  public records: UserCore[];

  @ClashModelProperty(DOCS_PAGED_RESPONSE.PROPS.meta)
  @Type(() => PagedResponseMeta)
  public meta: PagedResponseMeta;

  constructor(records: UserCore[], count: number, paginationOptions: PaginationOptions) {
    this.records = records;
    this.meta = new PagedResponseMeta(paginationOptions, count);
  }
}
