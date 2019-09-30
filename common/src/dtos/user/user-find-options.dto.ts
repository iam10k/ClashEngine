import { Type } from 'class-transformer';
import { DOCS_USER_FIND_OPTIONS } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';
import { FilterOptions } from '../core';

export class UserFindOptions extends FilterOptions {
  @ClashModelPropertyOptional(DOCS_USER_FIND_OPTIONS.PROPS.discordId)
  @Type(() => String)
  public discordId: string;
}
