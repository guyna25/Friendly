import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Document, Model } from "mongoose";

export class EventType {
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    eventTitlte: string;

    @IsArray()
    @ArrayNotEmpty()
    friendName: string[];

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsDate()
    @IsNotEmpty()
    date: Date;

    @IsString()
    notes: string;

    constructor(values?: JSON) {
        this.name = values['name'];
        this.eventTitlte = values['eventTitlte'];
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