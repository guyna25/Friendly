import { Controller, Get, Post, Body, Param, NotFoundException} from '@nestjs/common';
import {CreateEventDTO} from './dtos/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    eventsService: EventsService;
    
    constructor() {
        this.eventsService = new EventsService();
    }

    @Get()
    listEvents() {
        return this.eventsService.findAll();
    }

    @Post()
    createEvent(@Body() body: any) {
        this.eventsService.create(body.content);
    }

    @Get('/:id')
    async getEvent(@Param('id') id: string) {
        const event = await this.eventsService.findOne(id);
        if (!event) {
            throw new NotFoundException('Event not found');
        }

        return event;
    }
}
