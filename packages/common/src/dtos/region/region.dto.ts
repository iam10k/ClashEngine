import { DOCS_REGION } from '../../constants';
import { ClashModelProperty } from '../../decorators';

export class Region {
  @ClashModelProperty(DOCS_REGION.PROPS.key)
  public key: string;

  @ClashModelProperty(DOCS_REGION.PROPS.name)
  public name: string;

  @ClashModelProperty(DOCS_REGION.PROPS.iso2)
  public iso2: string;

  @ClashModelProperty(DOCS_REGION.PROPS.enabled)
  public enabled: boolean;
}
