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
        console.log(content);
        EventModel.create(content).then((val) =>{
            console.log(val);
            console.log("done");}
        );
        
    }

    async update(id: string, content: string) {
        const contents = await readFile('events.json', 'utf8');
        const events = JSON.parse(contents);
        events[id] = {id, content};

        await writeFile('events.json', JSON.stringify(events
            ));
    }

    async delete(id: string) {
        const contents = await readFile('events.json', 'utf8');
        const events = JSON.parse(contents);
        delete events[id];

        await writeFile('events.json', JSON.stringify(events
            ));
    }

    async deleteAll(id: string) {
        await writeFile('events.json', JSON.stringify({}));
    }
}