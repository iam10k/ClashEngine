import { ClashModelProperty } from '../../decorators';
import { ErrorType } from '../../enums';

export interface ErrorResponseInterface {
  statusCode: number;
  error: ErrorType;
  message: string | object | any;
}

export class ErrorResponse implements ErrorResponseInterface {
  @ClashModelProperty()
  statusCode: number;

  @ClashModelProperty()
  error: ErrorType;

  @ClashModelProperty()
  message: string | object | any;

  constructor(error: ErrorResponseInterface) {
    this.statusCode = error.statusCode;
    this.error = error.error;
    this.message = error.message;
  }
}
