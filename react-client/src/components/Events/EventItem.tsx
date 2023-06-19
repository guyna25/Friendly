import React from 'react';
import EventType from './EventType';
import {get_full_day_hour} from '../../utils/Utils';
import styled from 'styled-components';

const StyledEventItem = styled.li`
  border-color: #050D1F;
  width: 400px;
  height: 110px;
  border: 1px solid black;
  background-color: #6994EF;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const EventItem: React.FC<EventType> = (props) => {
    return (<StyledEventItem>
        <div>Name: {props.eventTitle}</div>
        <div>Friends: {props.friends.join(", ")}</div>
        <div>Date: {`${get_full_day_hour(props.date)} ${props.date.toLocaleDateString()}`}</div>
        <div>Location: {props.location}</div>
        {props.notes !== "" && <div>Notes: {props.notes}</div>}
    </StyledEventItem>
    );
}

export default EventItem;