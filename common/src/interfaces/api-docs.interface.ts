import { ConstantValue } from '../types';
import { SwaggerApiParamInterface } from './swagger-api-param.interface';
import { SwaggerApiQueryInterface } from './swagger-api-query.interface';
import { SwaggerModelPropertyInterface } from './swagger-model-property.interface';

export interface ApiDocsInterface<T> {
  PATH?: ConstantValue<T, SwaggerApiParamInterface>;
  QUERY?: ConstantValue<T, SwaggerApiQueryInterface>;
  PROPS?: ConstantValue<T, SwaggerModelPropertyInterface>;
}
