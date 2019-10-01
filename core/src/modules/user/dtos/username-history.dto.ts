import { ClashModelProperty, CoreData } from '@clash/common';
import { DOCS_USERNAME_HISTORY } from '../../../constants/api-docs.constant';

export class UsernameHistory extends CoreData {
  @ClashModelProperty(DOCS_USERNAME_HISTORY.PROPS.username)
  public username: string;
}
