import { Document, Model } from "mongoose";

export interface EventType {
    name: string,
    eventTitlte: string,
    friendName: Array<string>,
    location: string,
    date: Date,
    notes: string,
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