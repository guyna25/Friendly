import {Injectable} from '@nestjs/common';
import { EventsRepositoyry } from "./events.repository";
import { EventInput, EventType } from 'src/models/events.types';

@Injectable()
export class EventsService {

    constructor(public eventsRepo: EventsRepositoyry) {
        // console.log('Constructor arguments:', this);
    }

    findOne(id: string) {
        return this.eventsRepo.findOne(id);
    }

    findAll() {
        return this.eventsRepo.findAll();
    }

    create(content: EventInput) {
        return this.eventsRepo.create(content);
    }

    update(content: Partial<EventType>) {
        return this.eventsRepo.update(content);
    }

    remove(id: string) {
        return this.eventsRepo.delete(id);
    }

    deleteAll(content: string) {
        return this.eventsRepo.deleteAll(content);
    }
}