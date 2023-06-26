import { Controller, Get, Post, Patch, Body, Param, NotFoundException, Delete} from '@nestjs/common';
import {CreateEventDTO} from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { EventInput, EventType } from 'src/models/events.types';
import { PatchEventDTO } from './dtos/patch-event.dto';

@Controller('events')
export class EventsController {

    constructor(public eventsService: EventsService) {}

    @Post()
    async createEvent(@Body() body: CreateEventDTO) {
        const event_data : EventInput = JSON.parse(body.content as unknown as string) as EventInput;
        const new_event = await this.eventsService.create(event_data);
        return new_event.id;
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
    update(@Body() body: PatchEventDTO) {
        console.log('update here');
        let event_data : Partial<EventType> = JSON.parse(body.content) as Partial<EventType>;
        this.eventsService.update(event_data);
    }

    @Delete()
    remove(id: string) {
      return this.eventsService.remove(id);
    }
}
