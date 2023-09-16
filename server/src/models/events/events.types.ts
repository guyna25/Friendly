import { Document, Model } from 'mongoose';

export interface EventInput {
  title: string;
  friends: string[];
  location: string;
  start: Date;
  end: Date;
  wholeDay: boolean;
  notes?: string;
}

export class EventType {
  _id: string;
  title: string;
  friends: string[];
  location: string;
  start: Date;
  end: Date;
  wholeDay: boolean;
  notes?: string;

  constructor(values: EventInput) {
    const { title, friends, location, start, end, wholeDay, notes } = values;
    this.title = title;
    this.friends = friends;
    this.location = location;
    this.start = start;
    this.end = end;
    this.wholeDay = wholeDay;
    this.notes = notes;
  }
}

export interface EventDocument extends Document<EventType> {
  title: string;
  friends: Array<string>;
  location: string;
  start: Date;
  end: Date;
  wholeDay: boolean;
  notes: string;
}
export interface EventModel extends Model<EventDocument> {
  findOneOrCreate: ({
    eventTitle,
    friends,
    location,
    start,
    end,
    wholeDay,
    notes,
  }: {
    eventTitle: string;
    friends: Array<string>;
    location: string;
    start: Date;
    end: Date;
    wholeDay: boolean;
    notes: string;
  }) => Promise<EventDocument>;

  insertOne: ({
    eventTitle,
    friends,
    location,
    start,
    end,
    wholeDay,
    notes,
  }: {
    eventTitle: string;
    friends: Array<string>;
    location: string;
    start: Date;
    end: Date;
    wholeDay: boolean;
    notes: string;
  }) => Promise<EventDocument>;
}
