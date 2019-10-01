import { ClashModelPropertyOptional } from '@clash/common';
import { DOCS_MATCH_TEAM } from '../../../constants/api-docs.constant';

export class MatchTeamUpdate {
  @ClashModelPropertyOptional(DOCS_MATCH_TEAM.PROPS.score)
  public score: number;
}
