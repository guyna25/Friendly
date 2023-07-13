import React from 'react';
import EventItem from "./EventItem";
import { EventType } from "./EventType";

const Events: React.FC<{ events: EventType[], deleteHandler: (id: string) => void }> = (props) => {
  return <>
    {props.events.map(e =>
      <EventItem
        _id={e._id}
        eventTitle={e.eventTitle} friends={e.friends}
        location={e.location}
        date={e.date}
        notes={e.notes ?? ''}
        deleteHandle={props.deleteHandler}
      />
    )}
  </>
    ;
}

export default Events;