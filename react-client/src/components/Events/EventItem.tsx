import { Button, Card, CardActions, CardContent, CardHeader, Grid, Stack, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers';
import EventApiInstance from '../../api/EventApi';
import DateDisplay from '../DateDisplay';

const CARD_TEXT_COLOR = "#862B0D";
const BUTTON_TEXT_COLOR = "#862B0D";
const CARD_BACKGROUND_COLOR = "#F9F6DD";
const CARD_BORDER_COLOR = "#FFDEB4";
const CARD_CONTENT_TEXT_COLOR = "#2B7F2C";

const StyledCard = styled(Card)`
  background-color: ${CARD_BACKGROUND_COLOR};
  border-radius: 8px;
  border: 2px solid ${CARD_BORDER_COLOR};
`;

const StyledCardHeader = styled(CardHeader)`
  border-radius: ${CARD_BACKGROUND_COLOR};
  border: 2px solid ${CARD_BORDER_COLOR};
`;

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

          <DateTimePicker
            defaultValue={dateVal}
            value={dateVal}
            onChange={(date) => setDateVal(date ?? new Date())}
            ampm={false}
            minDate={new Date("2019-01-01")}
            maxDate={new Date("2100-01-01")}
          />

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

  return <StyledCard>
    <StyledCardHeader
      title={
        <Grid container xs={12} spacing={1}>
          <Grid item xs={4} >
            <Typography variant="h5" color={CARD_TEXT_COLOR}>
              {titleVal}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" color={CARD_TEXT_COLOR}>
              <DateDisplay dateVal={dateVal} />
            </Typography>
          </Grid>
        </Grid>
      }
    />
    <CardContent sx={{ textAlign: 'left' }}>
      <Stack>
        <Typography variant="body2" color={CARD_CONTENT_TEXT_COLOR}>
          Friends: {friendsVal}
        </Typography>
        <Typography variant="body2" color={CARD_CONTENT_TEXT_COLOR}>
          Location: {locationVal}
        </Typography>
        <Typography variant="body2" color={CARD_CONTENT_TEXT_COLOR}>
          {notesVal ? `Notes: ${notesVal}` : null}
        </Typography>
      </Stack>
    </CardContent>

    <CardActions>

      <Button
        variant='contained'
        sx={{ color: BUTTON_TEXT_COLOR, borderColor: CARD_TEXT_COLOR, backgroundColor: CARD_BACKGROUND_COLOR }}
        onClick={() => {
          setInEdit(true);
        }}>Edit</Button>
      <Button
        variant='contained'
        sx={{ color: BUTTON_TEXT_COLOR, borderColor: CARD_TEXT_COLOR, backgroundColor: CARD_BACKGROUND_COLOR }}
        onClick={() => {
          if (window.confirm("You are about to delete this event")) {
            EventApiInstance.destroyEvent(props._id, () => props.deleteHandle(props._id));
          }
        }}>Delete</Button>
    </CardActions>
  </StyledCard>;
}

export default EventItem;