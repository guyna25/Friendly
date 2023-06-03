import React from "react";
import EventForm from "./EventForm";
import { EventType } from "@testing-library/react";

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