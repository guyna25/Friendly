import axios from 'axios';
import EventType from '../components/Events/EventType';

export default class EventApi {
    endpoint: string = 'http://localhost:3000/events';

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
            data = data.map((e: EventType) => {
            return {
                _id: e._id,
                eventTitle: e.eventTitle,
                friends: e.friends,
                location: e.location,
                notes: e.notes,
                date: new Date(e.date)
            };
            });
            return data;
        } catch (error) {
            throw new Error('Something went wrong!');
        }
    }


    async updateEvent(updatedData: Partial<EventType>) {
        console.log(this.endpoint, updatedData);
        axios.patch(this.endpoint, {'content': JSON.stringify(updatedData)})
            .then(response => {
            // Handle the response from the server if needed
            console.log('Update successful:', response.data);
            })
            .catch(error => {
            // Handle errors if the update request fails
            console.error('Update failed:', error);
            });
    }

    createEvent(newEvent: EventType) {
        axios.patch(this.endpoint, {'content': JSON.stringify(newEvent)})
              .then(response => {
                // Handle the response from the server if needed
                console.log('Create successful:', response.data);
              })
              .catch(error => {
                // Handle errors if the update request fails
                console.error('Create failed:', error);
              });
    }

    destroyEvent() {
        //TODO implement
    }

}