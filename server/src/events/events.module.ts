import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import {EventsService} from './events.service';
import { EventsRepositoyry } from './events.repository';

@Module({
  controllers: [EventsController],
  providers: [EventsService, EventsRepositoyry],
  
})
export class EventsModule {}
