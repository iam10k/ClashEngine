import { Type } from 'class-transformer';
import { DOCS_MATCH_TEAM } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { CoreUpdatableData } from '../core';
import { MatchTeamMember } from './match-team-member.dto';

export class MatchTeam extends CoreUpdatableData {
  @ClashModelProperty({ ...DOCS_MATCH_TEAM.PROPS.members, type: MatchTeamMember, isArray: true })
  @Type(() => MatchTeamMember)
  public members: MatchTeamMember[];

  @ClashModelProperty(DOCS_MATCH_TEAM.PROPS.score)
  public score: number;
}
