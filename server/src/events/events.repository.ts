import {Injectable} from '@nestjs/common';
import {readFile, writeFile} from 'fs/promises';

@Injectable()
export class EventsRepositoyry {
    async findOne(id: string) {
        const contents = await readFile('events.json', 'utf8');
        const events = JSON.parse(contents);
        return events[id];
    }

    async findAll() {
        const contents = await readFile('events.json', 'utf8');
        const events = JSON.parse(contents);
        return events;
    }

    async create(content: string) {
        const contents = await readFile('events.json', 'utf8');
        const events = JSON.parse(contents);
        const id = Math.floor(Math.random() * 999);
        events[id] = {id, content};

        await writeFile('events.json', JSON.stringify(events
            ));
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