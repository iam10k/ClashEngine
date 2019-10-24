import { Type } from 'class-transformer';
import { DOCS_QUEUE_DETAILED } from '../../constants';
import { ClashModelProperty } from '../../decorators';
import { Game } from '../game';
import { Region } from '../region';
import { QueuePlayer } from './queue-player.dto';

export class QueueDetailed {
  @ClashModelProperty(DOCS_QUEUE_DETAILED.PROPS.game)
  @Type(() => Game)
  public game: Game;

  @ClashModelProperty(DOCS_QUEUE_DETAILED.PROPS.region)
  @Type(() => Region)
  public region: Region;

  @ClashModelProperty(DOCS_QUEUE_DETAILED.PROPS.enabled)
  public enabled: boolean;

  @ClashModelProperty(DOCS_QUEUE_DETAILED.PROPS.players)
  @Type(() => QueuePlayer)
  public players: QueuePlayer[];
}
