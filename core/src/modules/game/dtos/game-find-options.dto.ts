import { ClashModelPropertyOptional, FilterOptions } from '@clash/common';
import { Type } from 'class-transformer';

export class GameFindOptions extends FilterOptions {
  @ClashModelPropertyOptional({ type: 'boolean' })
  @Type(() => Boolean)
  readonly includeInactive?: boolean;
}
