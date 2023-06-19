import EventType from "./EventType";
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

const Events : React.FC<{title: string, events:EventType[]}>= (props) => {
    return <><EventListTitle> {props.title} </EventListTitle><StyledEventList>
    {props.events.map(e => 
      <EventItem 
        eventTitle={e.eventTitle} friendNames={e.friendNames}
        location={e.location}
        date={e.date}
        notes={e.notes ?? ''}/>
      )}
      </StyledEventList>
      </>
      ;
}

export default Events;