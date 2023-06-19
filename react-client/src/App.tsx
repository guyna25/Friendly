import NewEvent from './components/NewEvent/NewEvent';
import Events from './components/Events/EventsList';

import './App.css';
import React, { useState } from 'react';
import EventType from './components/Events/EventType';

function App() {
  
  const [eventStubs, setEventStubs] = useState([
    {"eventTitle": "Party",
    "friends": ["Mariah Carey"],
    "location": "Times square",
    "date": new Date("2025-01-01T23:00:00.000+00:00"),
    "notes": "Not actually invited"
      },
      {"eventTitle": "Drinks",
    "friends": ["Pink", "Katy perry", "Gaga"],
    "location": "Beerman",
    "date": new Date("2025-09-27T20:05:00.000+00:00"),
    "notes": undefined
      },
      {"eventTitle": "Board games",
    "friends": ["Willy wonka"],
    "location": "Neary the chocolate factory",
    "date": new Date("2000-01-01T00:08:00.000+00:00"),
    "notes": "A lot less messy"
      }
  ]);

  const addEventHandler = (data : Map<string, any>) => {
    // console.log('Phew...Here;s your data');
    console.log(data);
    setEventStubs([...eventStubs, data as unknown as EventType]
      );
  }

  return (
    <div>
    <h1 style={{'padding': '20px'}}>Friendly - meet your friends</h1>
      <div style={{'float': 'left'}}>
        <Events events={eventStubs} title={"Event list"}/>
      </div>
      <div style={{'float': 'left'}}>
      <NewEvent onAddEvent={addEventHandler}/>
      </div>
    </div>
  );
}

export default App;