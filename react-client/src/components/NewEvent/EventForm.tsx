import React, { useRef} from "react";

const EventForm : React.FC<any> = (props) => {
    const eventTitleInputRef = useRef<HTMLInputElement>(null);
    const friendsInputRef = useRef<HTMLInputElement>(null);
    const locationInputRef = useRef<HTMLInputElement>(null);
    const dateInputRef = useRef<HTMLInputElement>(null);
    const notesInputRef = useRef<HTMLInputElement>(null);
    // const formRef = useRef(null);

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
        if (dateInputRef.current !== null) {
            dateInputRef.current.value = '';
        }
        if (notesInputRef.current !== null) {
            notesInputRef.current.value = '';
        }
    }

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const eventData = {
            name: eventTitleInputRef.current?.value,
            friends: friendsInputRef.current?.value,
            location: locationInputRef.current?.value,
            date: dateInputRef.current?.value,
            notes: notesInputRef.current?.value,
        };
        console.log(eventData);
        props.onSaveEvent(eventData);
        // resetForm();
    };


    return <form onSubmit={submitHandler}>
        <div className="new-event__controls">
            <div className="new-event__control">
                <label>Name</label>
                <input type="text" ref={eventTitleInputRef} />
            </div>
            <div className="new-event__control" ref={friendsInputRef}>
                <label>Friends</label>
                <input type="text"/>
            </div>
            <div className="new-event__control" ref={locationInputRef}>
                <label>Location</label>
                <input type="text"/>
            </div>
            <div className="new-event__control" ref={dateInputRef}>
                <label>Date</label>
                <input type="date" min="2019-01-01" max="2100-01-01"/>
            </div>
            <div className="new-event__control" ref={notesInputRef}>
                <label>Notes</label>
                <input type="text"/>
            </div>
            
            <div className="new-expense__actions">
                <button type="submit">Add Event</button>
                
            </div>
        </div>
    </form>
};

export default EventForm;