import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document, Model } from "mongoose";

export class EventType {
    eventTitlte: string;
    friendName: string[];
    location: string;
    date: Date;
    notes: string;

    constructor(values?: Record<string, any>) {
        this.eventTitlte = values['eventTitle'];
        this.friendName = values['friendName'] ? values['friendName'].split(", ") : "";
        this.location = values['location'];
        this.date = values['date'] ? new Date(values['date']) : new Date();
        this.notes = values['notes'];
        // console.log(this);
    }
}

export interface EventDocument extends EventType, Document {};
export interface EventModel extends Model<EventDocument> {
    findOneOrCreate: (
        {
        eventTitlte,
        friendName,
        location,
        date,
        notes
        }: { 
            eventTitlte: string,
            friendName: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;

      insertOne: (
        {
        eventTitlte,
        friendName,
        location,
        date,
        notes
        }: { 
            eventTitlte: string,
            friendName: Array<string>,
            location: string,
            date: Date,
            notes: string,
        }
      ) => Promise<EventDocument>;
};