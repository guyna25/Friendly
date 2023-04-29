import { EventsRepositoyry } from "./events.repository";

export class EventsService {
    eventsRepo: EventsRepositoyry;

    constructor() {
        this.eventsRepo = new EventsRepositoyry();
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
}