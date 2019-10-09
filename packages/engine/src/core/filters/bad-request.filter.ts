import { ArrayUtil, ErrorResponse, ErrorType } from '@clash/common';
import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { Response } from 'express';

@Catch(BadRequestException)
export class BadRequestFilter implements ExceptionFilter<BadRequestException> {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let statusCode = exception.getStatus();
    const r = exception.getResponse() as any;

    if (r.message instanceof Array && r.message[0] instanceof ValidationError) {
      statusCode = HttpStatus.UNPROCESSABLE_ENTITY;
      r.error = ErrorType.VALIDATION;
      const validationErrors = r.message as ValidationError[];
      this.validationFilter(validationErrors);
    }

    r.statusCode = statusCode;
    response.status(statusCode).json(new ErrorResponse(r));
  }

  private validationFilter(validationErrors: ValidationError[]) {
    for (const validationError of validationErrors) {
      if (validationError.constraints) {
        for (const [key, constraint] of Object.entries(validationError.constraints)) {
          // convert default messages
          if (!!constraint) {
            // convert error message to error.fields.{key} syntax for i18n translation
            validationError.constraints[key] = undefined;
            validationError.constraints[key.toLowerCase()] = 'error.validation.' + key.toLowerCase();
          }
        }
      }
      if (!ArrayUtil.isEmpty(validationError.children)) {
        this.validationFilter(validationError.children);
      }
    }
  }
}
