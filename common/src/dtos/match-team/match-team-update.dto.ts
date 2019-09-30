import { DOCS_MATCH_TEAM } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';

export class MatchTeamUpdate {
  @ClashModelPropertyOptional(DOCS_MATCH_TEAM.PROPS.score)
  public score: number;
}
