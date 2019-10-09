import { Query, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export function ValidationQuery(options?: ValidationPipeOptions) {
  return Query(
    new ValidationPipe({
      ...{
        transform: true,
        transformOptions: {
          strategy: 'excludeAll'
        },
        validationError: {
          target: false,
          value: false
        }
      },
      ...options
    })
  );
}
