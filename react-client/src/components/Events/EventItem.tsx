import { Button, Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useState } from 'react';
import EventApiInstance from '../../api/EventApi';
import { DateTimePicker } from '@mui/x-date-pickers';

const EventItem: React.FC<{
  _id: string,
  eventTitle: string,
  friends: string[],
  location: string,
  notes: string | undefined,
  date: Date,
  deleteHandle: (id: string) => void
}> = (props) => {
  const [inEdit, setInEdit] = useState(false);

  const saveHandler = () => {
    if ((titleVal !== props.eventTitle) || (friendsVal !== props.friends.join(", ")) || (locationVal !== props.location) || (dateVal !== props.date) || (notesVal !== props.notes)) {
      EventApiInstance.updateEvent({
        _id: props._id,
        ...(titleVal !== props.eventTitle && { eventTitle: titleVal }),
        ...(friendsVal !== props.friends.join(", ") && { friends: friendsVal.split(",") }),
        ...(locationVal !== props.location && { location: locationVal }),
        ...(notesVal !== props.notes && { notes: notesVal }),
        ...(dateVal !== props.date && { date: dateVal }),
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
    return (<Card>
      <CardHeader
        title={<TextField id="standard-basic" variant="standard" label="Title" type="text" value={titleVal}
          onChange={(e) => settitleVal(e.target.value)}
        />}
        action={
          <Button onClick={saveHandler}>Save</Button>
        }
      />
      <CardContent>
        <TextField id="standard-basic" variant="standard" label="Friends" type="text" value={friendsVal}
          onChange={(e) => setfriendsVal(e.target.value)}
        />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DemoContainer components={['DateTimePicker']}>
            <DateTimePicker 
              defaultValue={dateVal}
              value={dateVal}
              onChange={(date) => setDateVal(date ?? new Date())}
              ampm={false}
              minDate={new Date("2019-01-01")}
              maxDate={new Date("2100-01-01")}
            />
          </DemoContainer>
        </LocalizationProvider>
        <TextField id="standard-basic" variant="standard" label="Location" type="text" value={locationVal}
          onChange={(e) => setlocationVal(e.target.value)}
        />
        <TextField id="standard-basic" variant="standard" label="Notes" type="text" value={notesVal}
          onChange={(e) => setnotesVal(e.target.value)}
        />
      </CardContent>
    </Card>);
  }

  return <Card>
    <CardHeader
      title={titleVal}
      action={<>
        <Button onClick={() => {
          setInEdit(true);
        }}>Edit</Button>
        <Button onClick={() => {
          if (window.confirm("You are about to delete this event")) {
            EventApiInstance.destroyEvent(props._id, () => props.deleteHandle(props._id));
          }
        }}>Delete</Button>
      </>}
    />
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {friendsVal}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {locationVal}
      </Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          defaultValue={dateVal}
          ampm={false}
          readOnly ={true}
        />
      </LocalizationProvider>
      <Typography variant="body2" color="text.secondary">
        {notesVal}
      </Typography>
    </CardContent>
  </Card>;
}

export default EventItem;