import React from "react";
import EventForm from "./EventForm";

const NewEvent : React.FC<any>= (props) => {

    const saveEventDataHandler = (enteredEventData: string[]) => {
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