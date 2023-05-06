import * as path from 'path';
import {config} from 'dotenv';
config({ path: path.join(__dirname, '..', '..', '.env')});

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { EventsModule } from './events/events.module';

import {mongoConnect} from './services/db';


async function bootstrap() {
  await mongoConnect();
  const app = await NestFactory.create(EventsModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
bootstrap();

