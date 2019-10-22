import { DOCS_MATCH } from '../../constants';
import { ClashModelPropertyOptional } from '../../decorators';
import { MatchStatusType } from '../../enums';

export class MatchUpdate {
  @ClashModelPropertyOptional(DOCS_MATCH.PROPS.winnerId)
  public winnerId: number;

  @ClashModelPropertyOptional(DOCS_MATCH.PROPS.status)
  public status: MatchStatusType;
}
