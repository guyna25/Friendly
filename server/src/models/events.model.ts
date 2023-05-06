import { model } from "mongoose";
import {EventDocument } from "./events.types";
import EventSchema from "./events.schema";
export const EventModel = model<EventDocument>("event", EventSchema);