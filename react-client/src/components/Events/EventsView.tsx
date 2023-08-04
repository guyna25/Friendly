import React from 'react';
import EventItem from "./EventItem";
import { EventType } from "./EventType";
import EventCalendar from './EventCalendar';

const Events: React.FC<{ events: EventType[], deleteHandler: (id: string) => void }> = (props) => {
  return <>
    <EventCalendar events={props.events} />
    {props.events.map(e =>
      <EventItem
        _id={e._id}
        title={e.title} 
        friends={e.friends}
        location={e.location}
        start={e.start}
        end={e.end}
        notes={e.notes ?? ''}
        deleteHandle={props.deleteHandler}
      />
    )}
  </>
    ;
}

export default Events;