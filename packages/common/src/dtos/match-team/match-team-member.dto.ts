import { DOCS_MATCH_TEAM_MEMBER } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { UserCore } from '../core';

export class MatchTeamMember {
  @ClashModelProperty({ ...DOCS_MATCH_TEAM_MEMBER.PROPS.user, type: UserCore })
  public user: UserCore;
}
