import NewEvent from './components/NewEvent/NewEvent';
import Events from './components/Events/EventsList';

import './App.css';
import EventApi from './api/EventApi';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import EventType from './components/Events/EventType';
import EventContext from './api/EventsContext';


function App() {

  const eventApi = useRef(new EventApi());
  const [events, setEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEventsHandler = useCallback(async () => {
    setError(null);
    try {
      const data = await eventApi.current.getEvents();

      setEvents(data);
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
    content = <Events events={events} title={"Event list"} />;
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
        <EventContext.Provider key={"context"} value={{apiService: eventApi.current}}>
        {content}
        </EventContext.Provider>
      </div>
      <div style={{ 'float': 'left' }}>
        <NewEvent onAddEvent={addEventHandler} />
      </div>
    </div>
  );
}

export default App;
