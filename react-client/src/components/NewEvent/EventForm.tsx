import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { PartialEventType } from '../Events/EventType';

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
                <div className="new-event__control">
                    <label>Name</label>
                    <input type="text" ref={eventTitleInputRef} />
                </div>
                <div className="new-event__control">
                    <label>Friends</label>
                    <input type="text" ref={friendsInputRef} />
                </div>
                <div className="new-event__control">
                    <label>Location</label>
                    <input type="text" ref={locationInputRef} />
                </div>
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
                <div className="new-event__control">
                    <label>Notes</label>
                    <input type="text" ref={notesInputRef} />
                </div>

                <div className="new-expense__actions">
                    <button type="submit">Add Event</button>
                </div>
            </div>
        </form>
    );
};

export default EventForm;
