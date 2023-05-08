import { Document, Model } from "mongoose";

export class EventType {
    name: string;
    eventTitlte: string;
    friendName: Array<string>;
    location: string;
    date: Date;
    notes: string;

    constructor(values?: Record<string, string>) {
        this.name = values.name;
        this.eventTitlte = values.name;
        this.friendName = values.name.split(", ");
        this.location = values.name;
        this.date = new Date(values.name);
        this.notes = values.name;
    }
}

export interface EventDocument extends EventType, Document {};
export interface EventModel extends Model<EventDocument> {
    findOneOrCreate: (
        {
        name,
        eventTitlte,
        friendName,
        location,
        date,
        notes
        }: { 
            name: string,
            eventTitlte: string,
            friendName: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;

      insertOne: (
        {
        name,
        eventTitlte,
        friendName,
        location,
        date,
        notes
        }: { 
            name: string,
            eventTitlte: string,
            friendName: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;
};