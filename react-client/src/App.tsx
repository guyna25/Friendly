import NewEvent from './components/NewEvent/NewEvent';
import Events from './components/Events/EventsList';

import './App.css';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import EventType from './components/Events/EventType';

function App() {

  const eventEndpoint = 'http://localhost:3000/events';
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateEventItem = (updatedData: Partial<EventType>) => {
    axios.patch(eventEndpoint, {'content': JSON.stringify(updatedData)})
      .then(response => {
        // Handle the response from the server if needed
        console.log('Update successful:', response.data);
      })
      .catch(error => {
        // Handle errors if the update request fails
        console.error('Update failed:', error);
      });
  }

  const fetchEventsHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/events');
      console.log(response.body);
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();

      setEvents(data.map((e: any) => {
        return {
          _id: e._id,
          eventTitle: e.eventTitle,
          friends: e.friends,
          location: e.location,
          notes: e.notes,
          date: new Date(e.date)
        }
      }));
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEventsHandler();
  }, [fetchEventsHandler]);

  const addEventHandler = (data: Map<string, any>) => {
    // console.log('Phew...Here;s your data');
    // console.log(data);
    setEvents([...events, data as unknown as EventType]
    );
  }

  let content = <p>Loading...</p>;


  if (events.length > 0) {
    content = <Events events={events} updateEvent={updateEventItem} title={"Event list"} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <div>
      <h1 style={{ 'padding': '20px' }}>Friendly - meet your friends</h1>
      <div style={{ 'float': 'left' }}>
        {content}
      </div>
      <div style={{ 'float': 'left' }}>
        <NewEvent onAddEvent={addEventHandler} />
      </div>
    </div>
  );
}

export default App;
