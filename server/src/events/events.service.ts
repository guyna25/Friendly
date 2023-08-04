import { Injectable } from '@nestjs/common';
import { EventsRepositoyry } from './events.repository';
import { EventInput, EventType } from 'src/models/events.types';

@Injectable()
export class EventsService {
  constructor(public eventsRepo: EventsRepositoyry) {}

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

  async remove(id: string) {
    return await this.eventsRepo.delete(id);
  }

  removeAll() {
    return this.eventsRepo.deleteAll();
  }
}
