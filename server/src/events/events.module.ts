import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventsRepositoyry } from './events.repository';
import { RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from 'src/services/logger.middleware';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepositoyry],
})
export class EventsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
