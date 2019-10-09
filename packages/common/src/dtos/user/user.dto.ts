import { DOCS_USER } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { UserCore } from '../core';
import { TeamMember } from '../team';
import { UsernameHistory } from './username-history.dto';

export class User extends UserCore {
  @ClashModelProperty(DOCS_USER.PROPS.teams)
  public teams: TeamMember[];

  @ClashModelProperty(DOCS_USER.PROPS.usernameHistory)
  public usernameHistory: UsernameHistory[];
}
