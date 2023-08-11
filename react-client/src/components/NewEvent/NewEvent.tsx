import { Box } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import { BUTTON_TEXT_COLOR, CARD_BACKGROUND_COLOR, CARD_TEXT_COLOR, EVENTITEM_BACKGROUND_COLOR, EVENTITEM_BORDER_COLOR } from '../../theme/Colors';
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
    const [expanded, setExpanded] = useState(false);

    const handleAccordionChange = () => {
        if (expanded) {
           //
        }
        setExpanded(!expanded);
    };

    return (

        <StyledBox>
            <Accordion sx={{ color: BUTTON_TEXT_COLOR, borderColor: CARD_TEXT_COLOR, backgroundColor: CARD_BACKGROUND_COLOR }} expanded={expanded} onChange={handleAccordionChange}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    New Event
                </AccordionSummary>
                <AccordionDetails>
                    <EventForm onSaveEvent={saveEventDataHandler} />
                </AccordionDetails>
            </Accordion>
        </StyledBox>

    );
};

export default NewEvent;
