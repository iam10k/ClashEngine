import { DOCS_FILTER_OPTIONS } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';
import { PaginationOptions } from './pagination-options.dto';

export class FilterOptions extends PaginationOptions {
  @ClashModelPropertyOptional(DOCS_FILTER_OPTIONS.PROPS.q)
  readonly q?: string;
}
