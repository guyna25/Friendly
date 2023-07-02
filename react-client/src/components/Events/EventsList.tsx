import { EventType } from "./EventType";
import EventItem from "./EventItem";
import React from 'react';
import styled from 'styled-components';
import { Typography } from "@mui/material";

const StyledEventList = styled.ul`
  padding: 10px;
  text-align: center;
`;

const Events: React.FC<{ title: string, events: EventType[], deleteHandler: (id: string) => void}> = (props) => {
  return <><Typography variant="h5"> {props.title} </Typography>
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