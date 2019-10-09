import { ApiErrorInterface, ErrorType } from '@clash/common';
import { HttpStatus, UnprocessableEntityException } from '@nestjs/common';

export class DataConstraintException extends UnprocessableEntityException {
  constructor(apiError: ApiErrorInterface<DataConstraintType>, ...fields: string[]) {
    const message = { fields: [], constraints: {}, statusCode: HttpStatus.UNPROCESSABLE_ENTITY };
    if (apiError) {
      message.fields = apiError.fields || fields;
      message.constraints = {
        [apiError.type || 'unknown']: `error.constraint.${apiError.type || 'unknown'}.${apiError.key}`
      };

      super({ message, error: ErrorType.CONSTRAINT });
    } else {
      super({ message, error: ErrorType.CONSTRAINT });
    }
  }
}

export enum DataConstraintType {
  UNIQUE = 'unique',
  CHECK = 'check'
}
