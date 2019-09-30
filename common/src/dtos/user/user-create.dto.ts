import { DOCS_USER_DETAIL } from '../../constants';
import { ClashModelProperty, ClashModelPropertyOptional } from '../../decorators';

export class UserCreate {
  @ClashModelPropertyOptional(DOCS_USER_DETAIL.PROPS.username)
  public username: string;

  @ClashModelPropertyOptional(DOCS_USER_DETAIL.PROPS.avatar)
  public avatar: string;

  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.avatar)
  public email: string;

  constructor(data: { username?: string; avatar?: string; email?: string } = {}) {
    this.username = data.username;
    this.avatar = data.avatar;
    this.email = data.email;
  }
}
