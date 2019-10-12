import { DOCS_MATCH_TEAM_CREATE } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class MatchTeamCreate {
  @ClashModelProperty(DOCS_MATCH_TEAM_CREATE.PROPS.members)
  public members: number[];
}
