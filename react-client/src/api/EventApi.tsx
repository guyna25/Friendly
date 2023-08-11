import axios from 'axios';
import { EventType, PartialEventType } from '../components/Events/EventType';

class EventApi {

    //@TODO add deploy env
    endpoint: string = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/events' : '';

    getEvent() {
        //TODO implement
    }

    async getEvents() {
        try {
            const response = await axios.get(this.endpoint);
            if (response.status !== 200) {
                throw new Error('Something went wrong!');
            }
            let data = response.data;
            data = data.map((e: {
                _id: string,
                title: string,
                friends: string[],
                location: string,
                notes: string | undefined,
                start: Date,
                end: Date,
                wholeDay: boolean,
            }) => {
                console.log("e:");
                console.log(e);
                return {
                    _id: e._id,
                    title: e.title,
                    friends: e.friends,
                    location: e.location,
                    notes: e.notes,
                    start: new Date(e.start),
                    end: new Date(e.end),
                    wholeDay: e.wholeDay,
                };
            });
            return data;
        } catch (error) {
            throw new Error('Something went wrong!');
        }
    }


    async updateEvent(updatedData: Partial<EventType>) {
        axios.patch(this.endpoint, { 'content': JSON.stringify(updatedData) })
            .then(response => {
                // Handle the response from the server if needed
                console.log('Update successful:', response.data);
            })
            .catch(error => {
                // Handle errors if the update request fails
                console.error('Update failed:', error);
            });
    }

    async createEvent(newEvent: PartialEventType) {
        const response = await axios.post(this.endpoint, { 'content': JSON.stringify(newEvent) });
        console.log('Create response:', response.data);
        return response.data;
    }

    async destroyEvent(id: string, afterDelete: (id: string) => void) {
        await axios.delete(this.endpoint, { data: { 'content': id } });
        // console.log("afterDelete: ", afterDelete);
        afterDelete(id);
    }

}

const EventApiInstance = new EventApi()
export default EventApiInstance;