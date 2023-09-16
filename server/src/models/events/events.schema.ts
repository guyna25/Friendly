import { Schema } from 'mongoose';
import { findOneOrCreate } from './events.statics';

const EventSchema = new Schema({
  title: { type: String, required: true },
  friends: { type: Array<string>, required: true },
  location: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  wholeDay: { type: Boolean, default: false },
  notes: { type: String, required: false },
});

EventSchema.statics.findOneOrCreate = findOneOrCreate;

export default EventSchema;
