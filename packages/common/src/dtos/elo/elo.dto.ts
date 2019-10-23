import { ClashModelProperty } from '../../decorators';
import { CoreUpdatableData } from '../core';

export class Elo extends CoreUpdatableData {
  @ClashModelProperty()
  public season: number;

  @ClashModelProperty()
  public elo: number;
}
