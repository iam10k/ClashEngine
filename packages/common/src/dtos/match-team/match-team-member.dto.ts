import { Type } from 'class-transformer';
import { DOCS_MATCH_TEAM_MEMBER } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { UserCore } from '../core';

export class MatchTeamMember {
  @ClashModelProperty({ ...DOCS_MATCH_TEAM_MEMBER.PROPS.user, type: UserCore })
  @Type(() => UserCore)
  public user: UserCore;
}
