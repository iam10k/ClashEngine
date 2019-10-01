import { ClashModelProperty, UserCore } from '@clash/common';
import { DOCS_MATCH_TEAM_MEMBER } from '../../../constants/api-docs.constant';

export class MatchTeamMember {
  @ClashModelProperty({ ...DOCS_MATCH_TEAM_MEMBER.PROPS.user, type: UserCore })
  public user: UserCore;
}
