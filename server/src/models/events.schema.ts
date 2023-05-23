import {Schema} from 'mongoose';
import { nanoid } from 'nanoid'
import { findOneOrCreate } from "./events.statics";

const EventSchema = new Schema({
    eventTitle: {type:String, required: true},
    friendName: {type: Array<String>, required: true},
    location: {type:String, required: true},
    date: {type:Date, required: true},
    notes: {type:String, required: false},
  });

EventSchema.statics.findOneOrCreate = findOneOrCreate;

export default EventSchema;