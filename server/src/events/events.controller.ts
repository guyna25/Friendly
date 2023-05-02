import { Controller, Get, Post, Patch, Body, Param, NotFoundException, Delete} from '@nestjs/common';
import {CreateEventDTO} from './dtos/create-event.dto';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
    
    constructor(public eventsService: EventsService) {}

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

    @Get()
    listEvents() {
        return this.eventsService.findAll();
    }

    @Patch('/:id')
    updateEvent(@Body() body: any, @Param('id') id: string) {
        this.eventsService.update(id, body.content);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.eventsService.remove(id);
    }
}
