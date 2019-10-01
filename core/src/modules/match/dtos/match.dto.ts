import { ClashModelProperty, CoreUpdatableData } from '@clash/common';
import { Type } from 'class-transformer';
import { DOCS_MATCH } from '../../../constants/api-docs.constant';
import { MatchTeam } from '../../match-team/dtos/match-team.dto';
import { MatchStatusType } from '../enums/match-status.type';
import { MatchType } from '../enums/match.type';

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
