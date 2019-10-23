import { ClashModelProperty } from '../../decorators';

export class Region {
  @ClashModelProperty()
  public key: string;

  @ClashModelProperty()
  public name: string;

  @ClashModelProperty()
  public iso2: string;

  @ClashModelProperty()
  public enabled: boolean;
}
