import { ApiErrorInterface, ErrorResponse, ErrorType } from '@clash/common';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';
import { DB_CONSTRAINT_ERRORS } from '../../constants';

@Catch(QueryFailedError)
export class QueryFailedFilter implements ExceptionFilter<QueryFailedError> {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const apiError: ApiErrorInterface<any> = DB_CONSTRAINT_ERRORS[(exception as any).constraint];

    const status = !!apiError ? HttpStatus.UNPROCESSABLE_ENTITY : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = {
      fields: apiError.fields || [],
      constraints: { [apiError.type || 'unknown']: `error.constraint.${apiError.type || 'unknown'}.${apiError.key}` }
    };

    response.status(status).json(
      new ErrorResponse({
        statusCode: status,
        error: !!apiError ? ErrorType.CONSTRAINT : ErrorType.OTHER,
        message: !!apiError ? message : 'error.server.internal'
      })
    );
  }
}
