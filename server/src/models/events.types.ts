import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document, Model } from "mongoose";

export interface EventInput {
    eventTitle: string;
    friends: string[];
    location: string;
    date?: Date;
    notes?: string;
}

export class EventType {
    _id: string;
    eventTitle: string;
    friends: string[];
    location: string;
    date: Date;
    notes?: string;

    constructor(values: EventInput) {
        const {eventTitle, friends: friends, location, date, notes} = values;
        this.eventTitle = eventTitle;
        this.friends =friends;
        this.location = location;
        this.date = date ?? new Date();
        this.notes = notes;
    }
}

export interface EventDocument extends Document<EventType> {
    eventTitle: string,
    friends: Array<string>,
    location: string,
    date: Date,
    notes: string,
};
export interface EventModel extends Model<EventDocument> {
    findOneOrCreate: (
        {
        eventTitle,
        friends,
        location,
        date,
        notes
        }: { 
            eventTitle: string,
            friends: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;

      insertOne: (
        {
        eventTitle,
        friends,
        location,
        date,
        notes
        }: { 
            eventTitle: string,
            friends: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;
};