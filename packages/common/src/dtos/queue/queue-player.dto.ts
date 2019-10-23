import { Type } from 'class-transformer';
import { ClashModelProperty } from '../../decorators';
import { UserElo } from '../elo';
import { User } from '../user';

export class QueuePlayer {
  @ClashModelProperty()
  @Type(() => User)
  public user: User;

  @ClashModelProperty()
  public userId: number;

  @ClashModelProperty()
  @Type(() => UserElo)
  public elo: UserElo;
}
