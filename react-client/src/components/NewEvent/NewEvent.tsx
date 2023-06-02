import React from "react";
import EventForm from "./EventForm";

const NewEvent = (props: { onAddEvent: (arg0: any) => void; }) => {

    const saveEventDataHandler = (enteredEventData) => {
        const eventData = {
            ...enteredEventData,
            id: Math.random().toString()
        };
        props.onAddEvent(eventData);
    };

    return <div className="new-event">
    <EventForm onSaveEvent={saveEventDataHandler}/>
    </div>
};

export default NewEvent;