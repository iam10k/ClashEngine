import { ClashModelPropertyOptional } from '@clash/common';
import { DOCS_GAME } from '../../../constants/api-docs.constant';

export class GameUpdate {
  @ClashModelPropertyOptional(DOCS_GAME.PROPS.name)
  public name: string;

  @ClashModelPropertyOptional(DOCS_GAME.PROPS.inactive)
  public inactive: boolean;
}
