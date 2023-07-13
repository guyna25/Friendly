import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { EVENTITEM_BACKGROUND_COLOR, EVENTITEM_BORDER_COLOR } from '../../theme/Colors';
import { PartialEventType } from '../Events/EventType';
import EventForm from './EventForm';

const StyledBox = styled(Box)`
  background-color: ${EVENTITEM_BACKGROUND_COLOR};
  border: 2px solid ${EVENTITEM_BORDER_COLOR};
  spcce: 2px;'
`;

const NewEvent: React.FC<{ onAddEvent: (data: PartialEventType) => void }> = (props) => {
    const saveEventDataHandler = (enteredEventData: PartialEventType) => {
        props.onAddEvent(enteredEventData);
    };

    return (
        <StyledBox>
            <EventForm onSaveEvent={saveEventDataHandler} />
        </StyledBox>
    );
};

export default NewEvent;
