import { DOCS_AUTH_TOKEN } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class AuthToken {
  @ClashModelProperty(DOCS_AUTH_TOKEN.PROPS.token)
  public token: string;

  @ClashModelProperty(DOCS_AUTH_TOKEN.PROPS.expires)
  public expires: Date;

  @ClashModelProperty(DOCS_AUTH_TOKEN.PROPS.fresh)
  public fresh: boolean;

  constructor(token?: string, expires?: Date, fresh?: boolean) {
    this.token = token;
    this.expires = expires;
    this.fresh = fresh;
  }
}
