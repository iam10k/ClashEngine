import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { BadRequestFilter, QueryFailedFilter } from './core/filters';
import { AllExceptionFilter } from './core/filters/all-exception.filter';
import { ConfigService } from '@clash/common';
import { Config } from './core/models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Clash Network API')
    .setDescription('The Clash Network core APIs and data endpoints.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const reflector = app.get(Reflector);

  app.enableCors({
    origin: true,
    credentials: true
  });

  app.useGlobalFilters(new AllExceptionFilter(), new BadRequestFilter(), new QueryFailedFilter());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        strategy: 'excludeAll'
      },
      validationError: {
        target: false,
        value: false
      }
    })
  );

  const configService: ConfigService<Config> = app.get(ConfigService);
  const port: number = configService.config.port;
  const host: string = configService.config.host;
  await app.listen(port, host, () => {
    Logger.log(`Now running on ${host} port ${port}`, 'ClashEngine');
  });
}

bootstrap();
