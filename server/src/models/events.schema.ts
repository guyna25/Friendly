import {Schema} from 'mongoose';
import { findOneOrCreate } from "./events.statics";

const EventSchema = new Schema({
    eventId: {type:Number,  required: true},
    name: {type:String, required: true},
    eventTitlte: {type:String, required: true},
    friendName: {type: Array<String>, required: true},
    location: {type:String, required: true},
    date: {type:Date, required: true},
    notes: {type:String, required: false},
  });

EventSchema.statics.findOneOrCreate = findOneOrCreate;

export default EventSchema;