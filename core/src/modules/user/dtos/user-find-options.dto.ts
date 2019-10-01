import { ClashModelPropertyOptional, FilterOptions } from '@clash/common';
import { Type } from 'class-transformer';
import { DOCS_USER_FIND_OPTIONS } from '../../../constants/api-docs.constant';

export class UserFindOptions extends FilterOptions {
  @ClashModelPropertyOptional(DOCS_USER_FIND_OPTIONS.PROPS.discordId)
  @Type(() => String)
  public discordId: string;
}
