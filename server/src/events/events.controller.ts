import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CreateEventDTO } from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { EventInput, EventType } from 'src/models/events.types';
import { PatchEventDTO } from './dtos/patch-event.dto';

@Controller('events')
export class EventsController {
  constructor(public eventsService: EventsService) {}

  @Post()
  async createEvent(@Body() body: CreateEventDTO) {
    const newEvent = JSON.parse(body.content);
    const event_data: EventInput = {
      title: newEvent.title,
      friends: newEvent.friends,
      location: newEvent.location,
      start: newEvent.start,
      end: newEvent.end,
      wholeDay: newEvent.wholeDay,
      notes: newEvent.notes,
    };
    const new_event = await this.eventsService.create(event_data);
    return new_event.id;
  }

  @Get('/:id')
  async getEvent(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
    return event;
  }

  @Get()
  listEvents() {
    return this.eventsService.findAll();
  }

  @Patch()
  update(@Body() body: PatchEventDTO) {
    const event_data: Partial<EventType> = JSON.parse(
      body.content,
    ) as Partial<EventType>;
    this.eventsService.update(event_data);
  }

  @Delete()
  async remove(@Body() body: { content: string }) {
    const res = await this.eventsService.remove(body.content);
    console.log('delete res: ', res);
  }
}
