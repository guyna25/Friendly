import { Controller, Get, Post, Patch, Body, Param, NotFoundException, Delete} from '@nestjs/common';
import {CreateEventDTO} from './dtos/create-event.dto';
import { EventsService } from './events.service';
import { EventType } from 'src/models/events.types';

@Controller('events')
export class EventsController {

    constructor(public eventsService: EventsService) {}

    @Post()
    createEvent(@Body() body: CreateEventDTO) {
        let event_data : Record<string, any> = JSON.parse(body.content as unknown as string);
        this.eventsService.create(new EventType(event_data));
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

    @Patch('/:id')
    updateEvent(@Body() body: Record<string, any>, @Param('id') id: string) {
        this.eventsService.update(id, body.content);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.eventsService.remove(id);
    }
}
