import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PartialEventType } from '../Events/EventType';
import { Button, TextField } from '@mui/material';

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
                eventTitle: eventTitleInputRef.current?.value ?? "",
                friends: friendsInputRef.current?.value.split(" ") ?? [],
                location: locationInputRef.current?.value ?? "",
                date: dateInput,
                notes: notesInputRef.current?.value ?? ""
            };
            props.onSaveEvent(eventData);
            resetForm();
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="new-event__controls">
                <TextField id="standard-basic" variant="standard" label="Title" inputRef={eventTitleInputRef} type="text" />
                <TextField id="standard-basic" variant="standard" label="Friends" inputRef={friendsInputRef} type="text" />
                <TextField id="standard-basic" variant="standard" label="Location" inputRef={locationInputRef} type="text" />

                <div className="new-event__control">
                    <label>Date</label>
                    <DatePicker
                        selected={dateInput}
                        onChange={(date) => setDateInput(date)}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        showTimeSelect={true}
                        timeIntervals={15}
                        minDate={new Date('2019-01-01')}
                        maxDate={new Date('2100-01-01')}
                    />
                </div>

                <TextField id="standard-basic" variant="standard" label="Notes" inputRef={notesInputRef} type="text" />

                <div className="new-expense__actions">
                    <Button type="submit" variant='contained'> Add Event</Button>
                </div>
            </div>
        </form>
    );
};

export default EventForm;
