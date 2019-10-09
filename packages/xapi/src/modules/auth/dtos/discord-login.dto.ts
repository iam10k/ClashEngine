import { ClashModelProperty } from '@clash/common';
import { DOCS_DISCORD_LOGIN } from '../../../constants';

export class DiscordLogin {
  @ClashModelProperty(DOCS_DISCORD_LOGIN.PROPS.code)
  public code: string;
}
