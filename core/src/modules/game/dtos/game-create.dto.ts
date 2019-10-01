import { ClashModelProperty } from '@clash/common';
import { DOCS_GAME } from '../../../constants/api-docs.constant';

export class GameCreate {
  @ClashModelProperty(DOCS_GAME.PROPS.name)
  public name: string;
}
