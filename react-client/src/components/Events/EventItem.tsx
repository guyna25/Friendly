import React, { useContext, useState } from 'react';
import { get_full_day_hour } from '../../utils/Utils';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import EventContext from '../../api/EventsContext';

const StyledEventItem = styled.li`
  border-color: #050D1F;
  width: 400px;
  height: 110px;
  border: 1px solid black;
  background-color: #6994EF;
  padding: 30px;
  border-radius: 10px;
  margin-bottom: 5px;
`;

const EventItem: React.FC<{
  _id: string,
  eventTitle: string,
  friends: string[],
  location: string,
  notes: string | undefined,
  date: Date,
}> = (props) => {
  const [inEdit, setInEdit] = useState(false);
  const eventContext = useContext(EventContext);

  const saveHandler = () => {
    if ((titleVal !== props.eventTitle) || (friendsVal !== props.friends.join(", ")) || (locationVal !== props.location) || (dateVal !== props.date) || (notesVal !== props.notes)) {
      //only add id and changed fields
      eventContext.apiService.updateEvent({
        _id: props._id,
        ...(titleVal !== props.eventTitle && {eventTitle: titleVal}),
        ...(friendsVal !== props.friends.join(", ") && { friends: friendsVal.split(",")}),
        ...(locationVal !== props.location &&{ location: locationVal}),
        ...(notesVal !== props.notes && { notes: notesVal}),
        ...(dateVal !== props.date && { date: dateVal}),
      });
    }

    setInEdit(false);
  }

  const [titleVal, settitleVal] = useState(props.eventTitle);
  const [friendsVal, setfriendsVal] = useState(props.friends.join(", "));//handle in submission
  const [locationVal, setlocationVal] = useState(props.location);
  const [notesVal, setnotesVal] = useState(props.notes);
  const [dateVal, setDateVal] = useState(props.date);

  if (inEdit) {
    return (<StyledEventItem>
      Name: <input defaultValue={titleVal} onChange={e => settitleVal(e.target.value)} /> <br />
      Friends: <input defaultValue={friendsVal} onChange={e => setfriendsVal(e.target.value)} /><br />
      Date: <DatePicker
        selected={dateVal}
        onChange={(date) => setDateVal(date!)}
        dateFormat="MMMM d, yyyy h:mm aa"
        showTimeSelect={true}
        timeIntervals={15}
        minDate={new Date("2019-01-01")}
        maxDate={new Date("2100-01-01")}
      /><br />
      Location: <input defaultValue={locationVal} onChange={e => setlocationVal(e.target.value)} /><br />
      Notes: <input defaultValue={notesVal} onChange={e => setnotesVal(e.target.value)} /><br />
      <Button onClick={saveHandler}>Save</Button>
    </StyledEventItem>);
  }

  return (<StyledEventItem>
    <Button onClick={() => {
      setInEdit(true);
    }}>Edit</Button>
    <div>Name: {titleVal}</div>
    <div>Friends: {friendsVal}</div>
    <div>Date: {`${get_full_day_hour(dateVal)} ${dateVal.toLocaleDateString()}`}</div>
    <div>Location: {locationVal}</div>
    {props.notes !== "" && <div>Notes: {notesVal}</div>}
  </StyledEventItem>
  );
}

export default EventItem;