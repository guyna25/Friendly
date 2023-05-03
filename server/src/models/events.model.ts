import {model } from 'mongoose';
import { EventSchema } from './events.mongo';

export default model<Event>('Event', EventSchema);