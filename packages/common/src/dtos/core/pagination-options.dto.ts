import { Type } from 'class-transformer';
import { DOCS_PAGINATION_OPTIONS } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';
import { Order } from '../../enums';

export class PaginationOptions {
  @ClashModelPropertyOptional(DOCS_PAGINATION_OPTIONS.PROPS.order)
  readonly order: Order;

  @ClashModelPropertyOptional(DOCS_PAGINATION_OPTIONS.PROPS.page)
  @Type(() => Number)
  readonly page: number;

  @ClashModelPropertyOptional(DOCS_PAGINATION_OPTIONS.PROPS.pageSize)
  @Type(() => Number)
  readonly pageSize: number;

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }
}
