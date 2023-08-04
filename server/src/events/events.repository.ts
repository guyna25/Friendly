import { Injectable } from '@nestjs/common';
import { EventType, EventInput } from 'src/models/events.types';
import { EventModel } from '../models/events.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class EventsRepositoyry {
  async findOne(id: string) {
    if (ObjectId.isValid(id)) {
      return EventModel.findOne({ _id: new ObjectId(id) });
    } else {
      return null;
    }
  }

  async findAll() {
    return EventModel.find({});
  }

  async create(content: EventInput) {
    const createResponse = await EventModel.create(content);
    const {
      _id,
      title,
      friends: friends,
      location,
      start,
      end,
      wholeDay,
      notes,
    } = createResponse;
    return {
      id: _id,
      title: title,
      friends: friends,
      location: location,
      start: start,
      end: end,
      wholeDay: wholeDay,
      notes: notes,
    };
  }

  async update(content: Partial<EventType>) {
    await this.findOne(content._id);
    await EventModel.findByIdAndUpdate(
      { _id: new ObjectId(content._id) },
      content,
    );
    await this.findOne(content._id);
  }

  async delete(id: string) {
    return await EventModel.deleteOne({ _id: id });
  }

  async deleteAll() {
    EventModel.deleteMany({});
  }
}
