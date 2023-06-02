import EventType from "./EventType";
import EventItem from "./EventsItem";
import React from 'react';

const Events : React.FC<{title: string, events:EventType[]}>= (props) => {
    return <div><h2> {props.title} </h2>
    {props.events.map(e => <EventItem eventTitle={e.eventTitle} friendNames={e.friendNames}
        location={e.location}
        date={e.date}
        notes={e.notes ?? ''}/>
      )}
      </div>
      ;
}

export default Events;