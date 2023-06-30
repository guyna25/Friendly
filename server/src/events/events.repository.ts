import { Injectable } from '@nestjs/common';
import { EventType, EventInput } from 'src/models/events.types';
import { EventModel } from "../models/events.model";
import { ObjectId } from 'mongodb';

@Injectable()
export class EventsRepositoyry {

    async findOne(id: string) {
        return EventModel.findOne({_id: new ObjectId(id)});
    }

    async findAll() {
        return EventModel.find({});
    }

    async create(content: EventInput) {
        const createResponse = await EventModel.create(content);
        const { eventTitle, friends: friends,
            location,
            date,
            notes,
            _id } = createResponse;
        //TODO create new object from createResponse
        return { eventTitle: eventTitle, friends: friends, location: location, date: date, notes: notes, id: _id };
    }

    async update(content: Partial<EventType>) {
        const stams = await this.findOne(content._id);
        console.log("before:", stams);
        const res = await EventModel.findByIdAndUpdate(
            {_id: new ObjectId(content._id)},
            content
        );
        const stam = await this.findOne(content._id);
        console.log("after:", stam);
    }

    async delete(id: string) {
        console.log("delete received");
        return await EventModel.deleteOne({ _id: id });
    }

    async deleteAll() {
        EventModel.deleteMany({});
    }
}