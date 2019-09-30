import { Type } from 'class-transformer';
import { ClashModelPropertyOptional } from '../../decorators';
import { FilterOptions } from '../core';

export class GameFindOptions extends FilterOptions {
  @ClashModelPropertyOptional({ type: 'boolean' })
  @Type(() => Boolean)
  readonly includeInactive?: boolean;
}
