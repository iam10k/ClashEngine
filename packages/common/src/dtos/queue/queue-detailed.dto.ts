import { Type } from 'class-transformer';
import { ClashModelProperty } from '../../decorators';
import { Game } from '../game';
import { Region } from '../region';
import { QueuePlayer } from './queue-player.dto';

export class QueueDetailed {
  @ClashModelProperty()
  @Type(() => Game)
  public game: Game;

  @ClashModelProperty()
  @Type(() => Region)
  public region: Region;

  @ClashModelProperty()
  public enabled: boolean;

  @ClashModelProperty()
  @Type(() => QueuePlayer)
  public players: QueuePlayer[];
}
