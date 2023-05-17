import {Injectable} from '@nestjs/common';
import { EventsRepositoyry } from "./events.repository";
import { EventType } from 'src/models/events.types';

@Injectable()
export class EventsService {

    constructor(public eventsRepo: EventsRepositoyry) {
        console.log('Constructor arguments:', this);
    }

    findOne(id: string) {
        return this.eventsRepo.findOne(id);
    }

    findAll() {
        return this.eventsRepo.findAll();
    }

    create(content: EventType) {
        return this.eventsRepo.create(content);
    }

    update(content: EventType) {
        return this.eventsRepo.update(content);
    }

    remove(content: EventType) {
        return this.eventsRepo.delete(content);
    }

    deleteAll(content: string) {
        return this.eventsRepo.deleteAll(content);
    }
}