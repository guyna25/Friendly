import React, { useState } from "react";

const EventForm : React.FC<any> = (props) => {

    const resetForm = () => {
        setEnteredName('');
        setEnteredFriends('');
        setEnteredLocation('');
        setEnteredDate('');
        setEnteredNotes('');
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        const eventData = {
            name: enteredName,
            friends: enteredFriends,
            location: enteredLocation,
            date: enteredDate,
            notes: enteredNotes,
        };
        props.onSaveEvent(eventData);
        resetForm();
    };

    const [enteredName, setEnteredName] = useState('');
    const [enteredFriends, setEnteredFriends] = useState('');
    const [enteredLocation, setEnteredLocation] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredNotes, setEnteredNotes] = useState('');

    const nameChangeHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const friendsChangeHandler = (event) => {
        setEnteredFriends(event.target.value);
    };

    const locationChangeHandler = (event) => {
        setEnteredLocation(event.target.value);
    };
    
    const dateChangeHandler = (event: any) => {
        setEnteredDate(event.target.value);
    };

    const notesChangeHandler = (event: any) => {
        setEnteredNotes(event.target.value);
    };


    return <form onSubmit={submitHandler}>
        <div className="new-event__controls">
            <div className="new-event__control">
                <label>Name</label>
                <input type="text" onChange={nameChangeHandler}/>
            </div>
            <div className="new-event__control" onChange={friendsChangeHandler}>
                <label>Friends</label>
                <input type="text"/>
            </div>
            <div className="new-event__control" onChange={locationChangeHandler}>
                <label>Location</label>
                <input type="text"/>
            </div>
            <div className="new-event__control" onChange={dateChangeHandler}>
                <label>Date</label>
                <input type="date" min="2019-01-01" max="2100-01-01"/>
            </div>
            <div className="new-event__control" onChange={notesChangeHandler}>
                <label>Notes</label>
                <input type="text"/>
            </div>
            
            <div className="new-expense__actions">
                <button type="submit">Add Expense</button>
                
            </div>
        </div>
    </form>
};

export default EventForm;