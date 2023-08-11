import React from 'react';
import EventItem from "./EventItem";
import { EventType } from "./EventType";
import EventCalendar from './EventCalendar';

const Events: React.FC<{ events: EventType[], deleteHandler: (id: string) => void }> = (props) => {
  return <>
    <EventCalendar events={props.events} />
  </>
    ;
}

export default Events;