import { DOCS_USERNAME_HISTORY } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { CoreData } from '../core';

export class UsernameHistory extends CoreData {
  @ClashModelProperty(DOCS_USERNAME_HISTORY.PROPS.username)
  public username: string;
}
