import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, EventProps, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { EventType } from './EventType';
import { Box, Popover } from '@mui/material';
import EventItem from './EventItem';

const localizer = momentLocalizer(moment)

interface AdjustedEventType {
    _id: string,
    title: string,
    friends: string[],
    location: string,
    notes: string | undefined,
    start: Date,
    end: Date
    wholeDay: boolean
}

//@TODO extend event props
const customEvent: React.ComponentType<EventProps<EventType>> = (eventData: EventProps<EventType>) => {
    return <>
        <strong> {eventData.event.title} </strong><br />
        {eventData.event.friends}
    </>
};

const EventCalendar = (props: { events: EventType[]; deleteHandler: (id: string) => void }) => {
    const [popOverOpen, setPopOverOpen] = useState(false);
    const [popOverAnchor, setPopOverAnchor] = useState<HTMLElement | null>(null); // Anchor element for Popover
    const [selectedEvent, setSelectedEvent] = useState<AdjustedEventType | null>(null);

    const events = props.events.map((event) => {
        return {
            ...event,
            title: event.title,
            start: event.start,
            end: event.end
        };
    });

    const handleEventSelect = (event: AdjustedEventType, e: React.SyntheticEvent<HTMLElement, Event>): void => {
        setSelectedEvent(event);
        setPopOverAnchor(e.currentTarget);
        setPopOverOpen(true);
    };

    const handleClosePopover = (): void => {
        setSelectedEvent(null);
        setPopOverAnchor(null);
        setPopOverOpen(false);
    };

    return (
        <>
            <Calendar
                localizer={localizer}
                components={{ event: customEvent }}
                events={events}
                style={{ height: 500 }}
                onSelectEvent={handleEventSelect}
            />
            <Popover
                open={popOverOpen}
                anchorEl={popOverAnchor}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                {selectedEvent && (
                    <Box >
                        <EventItem
                            _id={selectedEvent._id}
                            title={selectedEvent.title}
                            friends={selectedEvent.friends}
                            location={selectedEvent.location}
                            notes={selectedEvent.notes}
                            start={selectedEvent.start}
                            end={selectedEvent.end}
                            wholeDay={selectedEvent.wholeDay}
                            deleteHandle={props.deleteHandler}
                            closePopover={handleClosePopover}

                        />
                    </Box>
                )}
            </Popover>
        </>
    )
}

export default EventCalendar;
