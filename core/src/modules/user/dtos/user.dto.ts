import { ClashModelProperty, UserCore } from '@clash/common';
import { DOCS_USER } from '../../../constants/api-docs.constant';
import { TeamMember } from '../../team/dtos';
import { UsernameHistory } from './username-history.dto';

export class User extends UserCore {
  @ClashModelProperty(DOCS_USER.PROPS.teams)
  public teams: TeamMember[];

  @ClashModelProperty(DOCS_USER.PROPS.usernameHistory)
  public usernameHistory: UsernameHistory[];
}
