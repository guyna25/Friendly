import {Injectable} from '@nestjs/common';
import {readFile, writeFile} from 'fs/promises';
import { EventType } from 'src/models/events.types';
import { EventModel } from "../models/events.model";

@Injectable()
export class EventsRepositoyry {

    async findOne(id: string) {
        return EventModel.find(
            {id}
        );
    }

    async findAll() {
        const contents = await readFile('events.json', 'utf8');
        const events = JSON.parse(contents);
        return events;
    }

    async create(content: EventType) {   
        EventModel.create(content).then((val) =>{
            console.log(val);
            console.log("done");}
        );
        
    }

    async update(content: EventType) {
        EventModel.updateOne(content);
    }

    async delete(content: EventType) {
        EventModel.updateOne(content);
    }

    async deleteAll(id: string) {
        await writeFile('events.json', JSON.stringify({}));
    }
}