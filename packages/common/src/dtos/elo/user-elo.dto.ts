import { ClashModelProperty } from '../../decorators';
import { Elo } from './elo.dto';

export class UserElo extends Elo {
  @ClashModelProperty()
  public userId: number;
}
