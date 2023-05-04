import * as path from 'path';
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env')});
import mongoose from 'mongoose';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { EventsModule } from './events/events.module';

const {get_full_access_url} = require('./services/db_password_loader');
const {mongoConnect} = require('./services/db');


async function bootstrap() {
  await mongoConnect();
  const app = await NestFactory.create(EventsModule);
  app.useGlobalPipes(
    new ValidationPipe()
  );
  await app.listen(3000);
}
// process.on('SIGINT', function() {
//   console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
//   // some other closing procedures go here
//   process.exit( );
// })
bootstrap();

