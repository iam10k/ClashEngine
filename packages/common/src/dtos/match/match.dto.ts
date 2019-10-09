import { Type } from 'class-transformer';
import { DOCS_MATCH } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { MatchStatusType, MatchType } from '../../enums';
import { CoreUpdatableData } from '../core';
import { MatchTeam } from '../match-team';

export class Match extends CoreUpdatableData {
  @ClashModelProperty(DOCS_MATCH.PROPS.seasonId)
  public seasonId: number;

  @ClashModelProperty(DOCS_MATCH.PROPS.type)
  public type: MatchType;

  @ClashModelProperty(DOCS_MATCH.PROPS.status)
  public status: MatchStatusType;

  @ClashModelProperty(DOCS_MATCH.PROPS.winnerId)
  public winnerId: number;

  @ClashModelProperty({ ...DOCS_MATCH.PROPS.teams, type: MatchTeam, isArray: true })
  @Type(() => MatchTeam)
  public teams: MatchTeam[];

  @ClashModelProperty(DOCS_MATCH.PROPS.createdAt)
  public createdAt: Date;
}
