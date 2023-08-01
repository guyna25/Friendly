import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventType } from './Events/EventType';

const localizer = momentLocalizer(moment)

const MyCalendar = (props: { events: EventType[]; }) => {
    // Transform your events from your format to the format required by react-big-calendar
    const events = props.events.map((event) => {
        console.log(event.date);
        return {
            title: event.eventTitle + "\nFriends: " + event.friends.join(", ") 
                + "\nLocation: " + event.location 
                + (event.notes ? "\nNotes: " + event.notes : ""),
            start: event.date.getTime(),
            end: event.date.getTime()
        };
    });

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}

export default MyCalendar;
