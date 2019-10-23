import { Type } from 'class-transformer';
import { ClashModelProperty } from '../../decorators';
import { QueuePlayer } from './queue-player.dto';

export class Queue {
  @ClashModelProperty()
  public gameId: number;

  @ClashModelProperty()
  public regionKey: string;

  @ClashModelProperty()
  public enabled: boolean;

  @ClashModelProperty()
  @Type(() => QueuePlayer)
  public players: QueuePlayer[];
}
