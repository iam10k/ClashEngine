import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

export interface SwaggerModelPropertyInterface {
  description?: string;
  required?: boolean;
  type?: any;
  isArray?: boolean;
  validateEach?: boolean;
  collectionFormat?: string;
  default?: any;
  enum?: SwaggerEnumType;
  format?: string;
  in?: string;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: boolean;
  minimum?: number;
  exclusiveMinimum?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  readOnly?: boolean;
  nullable?: boolean;
  xml?: any;
  example?: any;
}
