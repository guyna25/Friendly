import { Controller, Get, Post, Patch, Body, Param, NotFoundException, Delete} from '@nestjs/common';
import {CreateEventDTO} from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { EventInput, EventType } from 'src/models/events.types';

@Controller('events')
export class EventsController {

    constructor(public eventsService: EventsService) {}

    @Post()
    createEvent(@Body() body: CreateEventDTO) {
        const event_data : EventInput = JSON.parse(body.content as unknown as string) as EventInput;
        this.eventsService.create(event_data);
    }

    @Get('/:id')
    async getEvent(@Param('id') id: string) {
        const event = await this.eventsService.findOne(id);
        // console.log(event);
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
    update(@Body() body: CreateEventDTO) {
        let event_data : EventType = body.content as unknown as EventType;
        this.eventsService.update(event_data);
    }

    @Delete()
    remove(id: string) {
      return this.eventsService.remove(id);
    }
}
