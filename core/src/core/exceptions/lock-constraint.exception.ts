import { ApiErrorInterface, ErrorType } from '@clash/common';
import { HttpException } from '@nestjs/common';

export class LockConstraintException extends HttpException {
  constructor(apiError: ApiErrorInterface<undefined>, ...fields: string[]) {
    const message = { fields: [], constraints: {}, statusCode: 423 };
    if (apiError) {
      message.fields = apiError.fields || fields;
      message.constraints = {
        locked: `error.locked.${apiError.key}`
      };

      super({ message, error: ErrorType.LOCKED }, 423);
    } else {
      super({ message, error: ErrorType.LOCKED }, 423);
    }
  }
}
