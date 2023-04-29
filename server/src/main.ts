import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { EventsModule } from './events/events.module';

async function bootstrap() {
  const app = await NestFactory.create(EventsModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
bootstrap();
