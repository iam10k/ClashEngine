import { Transform } from 'class-transformer';
import { DOCS_USER_DETAIL } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { CoreData } from './core-data.dto';

export class UserCore extends CoreData {
  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.username)
  public username: string;

  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.discordId)
  public discordId: string;

  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.avatar)
  public avatar: string;

  @ClashModelProperty(DOCS_USER_DETAIL.PROPS.flags)
  @Transform(v => (!!v ? v : undefined))
  public flags: number;
}
