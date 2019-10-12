import { Type } from 'class-transformer';
import { DOCS_MATCH } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { MatchType } from '../../enums';
import { MatchTeamCreate } from '../match-team';

export class MatchCreate {
  @ClashModelProperty(DOCS_MATCH.PROPS.type)
  public type: MatchType;

  @ClashModelProperty({ ...DOCS_MATCH.PROPS.teams, type: MatchTeamCreate, isArray: true })
  @Type(() => MatchTeamCreate)
  public teams: MatchTeamCreate[];
}
