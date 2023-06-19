import EventType from "./EventType";
import EventItem from "./EventItem";
import React from 'react';
import styled from 'styled-components';

const StyledEventList = styled.ul`
  padding: 10px;
`;

const Events : React.FC<{title: string, events:EventType[]}>= (props) => {
    return <><h2> {props.title} </h2><StyledEventList>
    {props.events.map(e => <EventItem eventTitle={e.eventTitle} friendNames={e.friendNames}
        location={e.location}
        date={e.date}
        notes={e.notes ?? ''}/>
      )}
      </StyledEventList>
      </>
      ;
}

export default Events;