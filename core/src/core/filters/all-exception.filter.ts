import { ErrorType } from '@clash/common';
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const r = exception.getResponse() as any;

    if (r && !Object.values(ErrorType).includes(r.error)) {
      r.error = ErrorType.OTHER;
    }

    response.status(statusCode).json(r);
  }
}
