import { EventDocument, EventModel, EventType } from "./events.types";
export async function findOneOrCreate(event: EventType): Promise<EventDocument> {
    const record = await this.findOne({ event });
    if (record) {
      return record;
    } else {
      return this.create({ event });
    }
}

export async function insertOne(event: EventType): Promise<void> {
  return this.create({ event });
}