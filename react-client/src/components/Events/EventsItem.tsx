import React from 'react';
import EventType from './EventType';
import {get_full_day_hour} from '../../utils/Utils';

const EventItem: React.FC<EventType> = (props) => {
    return (<>
        <div>Name: {props.eventTitle}</div>
        <div>Friends: {props.friendNames.join(", ")}</div>
        <div>Date: {`${get_full_day_hour(props.date)} ${props.date.toLocaleDateString()}`}</div>
        <div>Location: {props.location}</div>
        {props.notes !== "" && <div>Notes: {props.notes}</div>}
    </>
    );
}

export default EventItem;