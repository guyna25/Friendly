import { Grid, InputLabel, Stack, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useRef, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { PartialEventType } from '../Events/EventType';
import { CARD_TEXT_COLOR, EVENTITEM_BACKGROUND_COLOR, EVENTITEM_BORDER_COLOR } from '../../theme/Colors';
import EventButton from '../EventButton';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#262B32' : EVENTITEM_BACKGROUND_COLOR,
    space: `2px`,
    textAlign: 'left',
    margin: '5px'
}));

const StyledInputLabel = styled(InputLabel)(() => ({
    color: CARD_TEXT_COLOR,
    fontSize: 'calc(1vw + 1vh + 0.5vmin)',
}));

const EventForm: React.FC<{ onSaveEvent: (enteredEventData: PartialEventType) => void }> = (props) => {
    const eventTitleInputRef = useRef<HTMLInputElement>(null);
    const friendsInputRef = useRef<HTMLInputElement>(null);
    const locationInputRef = useRef<HTMLInputElement>(null);
    const [dateInput, setDateInput] = useState<Date | null>(null);
    const notesInputRef = useRef<HTMLInputElement>(null);

    const resetForm = () => {
        if (eventTitleInputRef.current !== null) {
            eventTitleInputRef.current.value = '';
        }
        if (friendsInputRef.current !== null) {
            friendsInputRef.current.value = '';
        }
        if (locationInputRef.current !== null) {
            locationInputRef.current.value = '';
        }
        if (dateInput !== null) {
            setDateInput(null);
        }
        if (notesInputRef.current !== null) {
            notesInputRef.current.value = '';
        }
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        if (eventTitleInputRef.current?.value && locationInputRef.current?.value && friendsInputRef.current?.value && dateInput) {
            const eventData: PartialEventType = {
                title: eventTitleInputRef.current?.value ?? "",
                friends: friendsInputRef.current?.value.split(" ") ?? [],
                location: locationInputRef.current?.value ?? "",
                start: dateInput,
                end: dateInput,
                notes: notesInputRef.current?.value ?? ""
            };
            props.onSaveEvent(eventData);
            resetForm();
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <Stack>
                <Item>
                    <StyledInputLabel htmlFor="eventTitleField">Title</StyledInputLabel>
                    <TextField id="eventTitleField" variant="standard" inputRef={eventTitleInputRef} type="text" />
                </Item>
                <Item>
                    <StyledInputLabel htmlFor="dateInput">Date</StyledInputLabel>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DemoContainer components={['DateTimePicker']}>
                            <div id="dateInput">
                                <DateTimePicker
                                    value={dateInput}
                                    onChange={(date) => setDateInput(date ?? new Date())}
                                    ampm={false}
                                    defaultValue={new Date()}
                                    minDate={new Date("2019-01-01")}
                                    maxDate={new Date("2100-01-01")}
                                />
                            </div>
                        </DemoContainer>
                    </LocalizationProvider>
                </Item>
                <Item>
                    <StyledInputLabel htmlFor="friendsField">Friends</StyledInputLabel>
                    <TextField id="friendsField" variant="standard" inputRef={friendsInputRef} type="text" size="small" />
                </Item>
                <Item>
                    <StyledInputLabel htmlFor="locationField">Location</StyledInputLabel>
                    <TextField id="locationField" variant="standard" inputRef={locationInputRef} type="text" size="small" />
                </Item>
                <Item>
                    <StyledInputLabel htmlFor="notesField">Notes</StyledInputLabel>
                    <TextField id="notesField" variant="standard" inputRef={notesInputRef} type="text" size="small" />
                </Item>
            </Stack>
            <Grid item xs={12}>
                <EventButton content='Add Event' type="submit" />
            </Grid>
        </form>
    );


};

export default EventForm;
