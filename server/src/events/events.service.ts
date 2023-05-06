import {Injectable} from '@nestjs/common';
import { EventsRepositoyry } from "./events.repository";

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

    create(content: string) {
        return this.eventsRepo.create(content);
    }

    update(id: string, content: string) {
        return this.eventsRepo.update(id, content);
    }

    remove(content: string) {
        return this.eventsRepo.delete(content);
    }

    deleteAll(content: string) {
        return this.eventsRepo.deleteAll(content);
    }
}