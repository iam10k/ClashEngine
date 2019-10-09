import { DOCS_AUTH_RESPONSE } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { UserDetail } from '../user';
import { AuthToken } from './auth-token.dto';

export class AuthResponse {
  @ClashModelProperty(DOCS_AUTH_RESPONSE.PROPS.user)
  public user: UserDetail;

  @ClashModelProperty(DOCS_AUTH_RESPONSE.PROPS.accessToken)
  public accessToken: AuthToken;

  constructor(user?: UserDetail, accessToken?: AuthToken) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
