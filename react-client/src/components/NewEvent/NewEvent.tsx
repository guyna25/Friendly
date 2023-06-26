import React from 'react';
import EventForm from './EventForm';
import {PartialEventType} from '../Events/EventType';

const NewEvent: React.FC<any> = (props) => {
    const saveEventDataHandler = (enteredEventData: PartialEventType) => {
        props.onAddEvent(enteredEventData);
    };

    return (
        <div className="new-event">
            <EventForm onSaveEvent={saveEventDataHandler} />
        </div>
    );
};

export default NewEvent;
