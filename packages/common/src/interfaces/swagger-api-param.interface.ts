import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

export interface SwaggerApiParamInterface {
  name: string;
  description?: string;
  required?: boolean;
  enum?: SwaggerEnumType;
  type?: any;
}
