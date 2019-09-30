import { DOCS_USER_DETAIL } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';

export class UserUpdate {
  @ClashModelPropertyOptional(DOCS_USER_DETAIL.PROPS.username)
  public username: string;

  @ClashModelPropertyOptional(DOCS_USER_DETAIL.PROPS.avatar)
  public email: string;
}
