import { EventType } from "./EventType";
import EventItem from "./EventItem";
import React from 'react';
import styled from 'styled-components';

const StyledEventList = styled.ul`
  padding: 10px;
  text-align: center;
`;

const EventListTitle = styled.h2`
padding-left: 180px;
// text-align: center;
`;

const Events: React.FC<{ title: string, events: EventType[], deleteHandler: (id: string) => void}> = (props) => {
  return <><EventListTitle> {props.title} </EventListTitle>
    <StyledEventList>
      {props.events.map(e =>
        <EventItem
          _id={e._id}
          eventTitle={e.eventTitle} friends={e.friends}
          location={e.location}
          date={e.date}
          notes={e.notes ?? ''}
          deleteHandle={props.deleteHandler}
        />
      )}
    </StyledEventList>
  </>
    ;
}

export default Events;