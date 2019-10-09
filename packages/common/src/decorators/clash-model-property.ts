import { ApiModelProperty } from '@nestjs/swagger';
import { Expose, ExposeOptions } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsDate,
  IsDefined,
  IsDivisibleBy,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidationOptions
} from 'class-validator';
import { SwaggerModelPropertyInterface } from '../interfaces';
import { Default } from './default';

const noop = () => void 0;

export function ClashModelProperty(metadata: SwaggerModelPropertyInterface = {}, exposeOptions?: ExposeOptions) {
  if (metadata.required !== false && metadata.required !== true) {
    metadata.required = true;
  }

  const options: ValidationOptions = {
    each: metadata.isArray && metadata.validateEach
  };

  const apiModelPropertyFn = ApiModelProperty({ ...metadata });
  const isDefinedFn = metadata.required ? IsDefined() : noop;
  const isOptionalFn = !metadata.required || metadata.nullable ? IsOptional() : noop;

  const isArrayFn = metadata.isArray ? IsArray() : noop;
  const isStringFn = metadata.type === 'string' && !metadata.format ? IsString(options) : noop;
  const isNumberFn = metadata.type === 'number' ? IsNumber(undefined, options) : noop;
  const isIntFn = metadata.type === 'integer' ? IsInt(options) : noop;
  const isBooleanFn = metadata.type === 'boolean' ? IsBoolean(options) : noop;
  const isDateFn =
    metadata.type === 'string' && (metadata.format === 'date' || metadata.format === 'date-time')
      ? IsDate({
          ...options,
          message: '$property must be an ISO date'
        })
      : noop;

  const isEnumFn = metadata.enum ? IsIn(metadata.enum as any[], options) : noop;
  const isDivisibleByFn = metadata.multipleOf ? IsDivisibleBy(metadata.multipleOf, options) : noop;

  const maxFn = metadata.maximum ? Max(metadata.maximum - (metadata.exclusiveMaximum ? 1 : 0), options) : noop;
  const minFn = metadata.minimum ? Min(metadata.minimum + (metadata.exclusiveMinimum ? 1 : 0), options) : noop;
  const maxLengthFn = metadata.maxLength ? MaxLength(metadata.maxLength, options) : noop;
  const minLengthFn = metadata.minLength ? MinLength(metadata.minLength, options) : noop;

  const matchesFn = metadata.pattern ? Matches(new RegExp(metadata.pattern), options) : noop;

  const arrayMaxSizeFn = metadata.maxItems ? ArrayMaxSize(metadata.maxItems) : noop;
  const arrayMinSizeFn = metadata.minItems ? ArrayMinSize(metadata.minItems) : noop;
  const arrayUniqueFn = metadata.uniqueItems ? ArrayUnique() : noop;

  const defaultFn = metadata.default ? Default(metadata.default) : noop;
  const exposeFn = Expose(exposeOptions);

  return (target: any, key: string) => {
    apiModelPropertyFn(target, key);

    isDefinedFn(target, key);
    isOptionalFn(target, key);
    isArrayFn(target, key);
    isStringFn(target, key);
    isNumberFn(target, key);
    isIntFn(target, key);
    isBooleanFn(target, key);
    isDateFn(target, key);
    isEnumFn(target, key);
    isDivisibleByFn(target, key);
    maxFn(target, key);
    minFn(target, key);
    maxLengthFn(target, key);
    minLengthFn(target, key);
    matchesFn(target, key);
    arrayMaxSizeFn(target, key);
    arrayMinSizeFn(target, key);
    arrayUniqueFn(target, key);

    defaultFn(target, key);
    exposeFn(target, key);
  };
}

export function ClashModelPropertyOptional(
  metadata: SwaggerModelPropertyInterface = {},
  exposeOptions?: ExposeOptions
) {
  return ClashModelProperty({ ...metadata, required: false }, exposeOptions);
}
