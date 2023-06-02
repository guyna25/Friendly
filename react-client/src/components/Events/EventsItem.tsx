import React from 'react';
import EventType from './EventType';

const EventItem: React.FC<EventType> = (props) => {
    return (<div>
        <div>Name: {props.eventTitle}</div>
        <div>FriendsList: {props.friendNames}</div>
        <div>Date: {props.date.toISOString()}</div>
        <div>Location: {props.location}</div>
        <div>Notes: {props.notes}</div>
    </div>);
}

export default EventItem;