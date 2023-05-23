import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document, Model } from "mongoose";

export interface EventInput {
    eventTitle: string;
    friendNames: string[];
    location: string;
    date?: Date;
    notes?: string;
}

export class EventType {
    _id: string;
    eventTitle: string;
    friendNames: string[];
    location: string;
    date: Date;
    notes?: string;

    constructor(values: EventInput) {
        const {eventTitle, friendNames, location, date, notes} = values;
        this.eventTitle = eventTitle;
        this.friendNames =friendNames;
        this.location = location;
        this.date = date ?? new Date();
        this.notes = notes;
    }
}

export interface EventDocument extends Document<EventType> {
    eventTitle: string,
    friendNames: Array<string>,
    location: string,
    date: Date,
    notes: string,
};
export interface EventModel extends Model<EventDocument> {
    findOneOrCreate: (
        {
        eventTitle,
        friendName,
        location,
        date,
        notes
        }: { 
            eventTitle: string,
            friendName: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;

      insertOne: (
        {
        eventTitle,
        friendName,
        location,
        date,
        notes
        }: { 
            eventTitle: string,
            friendName: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;
};