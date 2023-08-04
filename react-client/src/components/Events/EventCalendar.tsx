import moment from 'moment';
import React from 'react';
import { Calendar, EventProps, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventType } from './EventType';

const localizer = momentLocalizer(moment)

interface AdjustedEventType {
    _id: string,
    title: string,
    friends: string[],
    location: string,
    notes: string | undefined,
    start: Date,
    end: Date
}

//@TODO extend event props
const customEvent: React.ComponentType<EventProps<AdjustedEventType>> = (eventData: EventProps<AdjustedEventType>) => {
    return <>
        {eventData.event.title}<br/>
        {eventData.event.notes}
    </>
};

const EventCalendar = (props: { events: EventType[]; }) => {
    const events = props.events.map((event) => {
        return {
            ...event,
            title: event.title,
            start: event.start,
            end: event.end
        };
    });

    return (
        <>
            <Calendar
                localizer={localizer}
                components={{event: customEvent}}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </>
    )
}

export default EventCalendar;
