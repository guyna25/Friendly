import Events from './components/Events/EventsList';
import NewEvent from './components/NewEvent/NewEvent';

import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import EventApiInstance from './api/EventApi';
import { EventType, PartialEventType } from './components/Events/EventType';


function App() {

  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteHandler = (deletedId: string) => {
    setEvents(events.filter((event) => event._id !== deletedId));
  }

  const fetchEventsHandler = useCallback(async () => {
    setError(null);
    try {
      const data = await EventApiInstance.getEvents();

      setEvents(data);
    } catch (error: any) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchEventsHandler();
  }, [fetchEventsHandler]);

  const addEventHandler = (data: PartialEventType) => {
    // console.log('Phew...Here;s your data');
    // console.log(data);
    EventApiInstance.createEvent(data).then((newId: string) => {
      const newEvent: EventType = {
        _id: newId,
        "eventTitle": data.eventTitle,
        "friends": data.friends,
        "location": data.location,
        "notes": data.notes,
        "date": data.date
      }
      console.log('create succesful:', newEvent);
      setEvents([...events, newEvent]);
    });
  }

  let content = <p>Loading...</p>;


  if (events.length > 0) {
    content = <Events events={events} title={"Event list"} deleteHandler={deleteHandler} />;
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
