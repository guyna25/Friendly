import React from 'react';
import { Calendar, momentLocalizer, Event, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface EventType extends Event {
  eventTitle: string;
  friends: string[];
  location: string;
  notes?: string;
}

const events: EventType[] = [
  {
    eventTitle: 'Event 1',
    friends: ['Friend 1', 'Friend 2'],
    location: 'Location 1',
    notes: 'Some notes about Event 1',
    start: new Date(2023, 6, 30, 10, 0), // July 30, 2023, 10:00 AM
    end: new Date(2023, 6, 30, 12, 0), // July 30, 2023, 12:00 PM
  },
  // Add more events as needed
];

const MyCalendar: React.FC = () => {
  const eventTooltip = (event: EventType) => {
    return (
      <div>
        <strong>{event.eventTitle}</strong>
        <br />
        Location: {event.location}
        <br />
        Friends: {event.friends.join(', ')}
        <br />
        Notes: {event.notes}
      </div>
    );
  };

  const onView = (view: View) => {
    // Workaround for the "d is undefined" issue when switching to weekly and daily view
    if (view === 'week' || view === 'day') {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 0);
    }
  };

  return (
    <div>
      <Calendar<EventType>
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="eventTitle"
        tooltipAccessor={eventTooltip}
        // Add the onView callback to fix "d is undefined" issue
        onView={onView}
        // You can add more customizations here based on your EventType fields
      />
    </div>
  );
};

export default MyCalendar;
