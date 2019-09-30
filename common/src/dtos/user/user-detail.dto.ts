import { Transform } from 'class-transformer';
import { DOCS_USER_DETAIL } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { UserCore } from '../core';

export class UserDetail extends UserCore {
  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.email)
  public email: string;

  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.registered)
  public registered: boolean;

  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.roles)
  @Transform(v => (!!v ? v : 0))
  public roles: number;
}
