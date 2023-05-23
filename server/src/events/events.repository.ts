import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { EventType, EventInput } from 'src/models/events.types';
import { EventModel } from "../models/events.model";

@Injectable()
export class EventsRepositoyry {

    async findOne(id: string) {
        return EventModel.find({ _id: id });
    }

    async findAll() {
        return EventModel.find({});
    }

    async create(content: EventInput) {
        const createResponse = await EventModel.create(content);
        const { eventTitle, friendNames,
            location,
            date,
            notes,
            _id } = createResponse;
        console.log(createResponse);
        //TODO create new object from createResponse
        return { eventTitle: eventTitle, friendName: friendNames, location: location, date: date, notes: notes, id: _id };
    }

    async update(content: EventInput) {
        EventModel.updateOne(content);
    }

    async delete(id: string) {
        EventModel.deleteOne({ _id: id });
    }

    async deleteAll(id: string) {
        EventModel.deleteMany({});
    }
}