import {readFile, writeFile} from 'fs/promises';

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
}