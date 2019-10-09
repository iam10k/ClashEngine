import { SwaggerEnumType } from '@nestjs/swagger/dist/types/swagger-enum.type';

export interface SwaggerApiQueryInterface {
  name: string;
  description?: string;
  required?: boolean;
  type?: any;
  isArray?: boolean;
  enum?: SwaggerEnumType;
  collectionFormat?: 'csv' | 'ssv' | 'tsv' | 'pipes' | 'multi';
}
