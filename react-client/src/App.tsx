import Events from './components/Events/EventsView';
import NewEvent from './components/NewEvent/NewEvent';

import { Box, Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import EventApiInstance from './api/EventApi';
import { EventType, PartialEventType } from './components/Events/EventType';
import { APP_BACKGROUND_COLOR } from './theme/Colors';
import theme from './theme/MuiTheme';
import AppHeader from './components/Header';
import EventCalendar from './components/Events/EventCalendar';

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
    EventApiInstance.createEvent(data).then((newId: string) => {
      const newEvent: EventType = {
        _id: newId,
        "title": data.title,
        "friends": data.friends,
        "location": data.location,
        "notes": data.notes,
        "start": data.start,
        "end": data.end
      }
      console.log('create succesful:', newEvent);
      setEvents([...events, newEvent]);
    });
  }

  let content = <p>Loading...</p>;


  if (events.length > 0) {
    content = <Events events={events} deleteHandler={deleteHandler} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <ThemeProvider theme={theme}>
      <AppHeader title='Friendly - meet your friends'></AppHeader>
      <Box>
        <EventCalendar events={events}/>
          
      </Box>
      <Box sx={{ backgroundColor: APP_BACKGROUND_COLOR, marginLeft: '10px' }}>
        <Grid container spacing={2} direction="row" >
          <Grid item direction="column" xs={3}>
            {content}
          </Grid>
          <Grid item xs={6}>
            <NewEvent onAddEvent={addEventHandler} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
