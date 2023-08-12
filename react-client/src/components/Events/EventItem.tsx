import { Card, CardActions, CardContent, CardHeader, Checkbox, FormControlLabel, Grid, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { BUTTON_STYLE, CARD_BACKGROUND_COLOR, CARD_BORDER_COLOR, CARD_CONTENT_TEXT_COLOR, CARD_TEXT_COLOR } from '../../theme/Colors';

import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import { DateTimePicker } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import EventApiInstance from '../../api/EventApi';
import DateDisplay from '../DateDisplay';
import EventButton from '../EventButton';

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
  title: string,
  friends: string[],
  location: string,
  notes: string | undefined,
  start: Date,
  end: Date,
  wholeDay: boolean | undefined
  deleteHandle: (id: string) => void
  closePopover?: () => void
}> = (props) => {
  const [inEdit, setInEdit] = useState(false);

  const saveHandler = () => {
    if ((titleVal !== props.title) || (friendsVal !== props.friends.join(", ")) || (locationVal !== props.location) || (startVal !== props.start) || (endVal !== props.end) || (notesVal !== props.notes) || (wholeDayVal !== props.wholeDay)) {
      EventApiInstance.updateEvent({
        _id: props._id,
        ...(titleVal !== props.title && { title: titleVal }),
        ...(friendsVal !== props.friends.join(", ") && { friends: friendsVal.split(",") }),
        ...(locationVal !== props.location && { location: locationVal }),
        ...(notesVal !== props.notes && { notes: notesVal }),
        ...(startVal !== props.start && { date: startVal }),
        ...(endVal !== props.end && { date: endVal }),
        ...(wholeDayVal !== props.wholeDay && { date: wholeDayVal }),
      });
    }

    setInEdit(false);
  }

  const [titleVal, settitleVal] = useState(props.title);
  const [friendsVal, setfriendsVal] = useState(props.friends.join(", "));//handle in submission
  const [locationVal, setlocationVal] = useState(props.location);
  const [notesVal, setnotesVal] = useState(props.notes);
  const [startVal, setStartVal] = useState(props.start);
  const [endVal, setEndVal] = useState(props.end);
  const [wholeDayVal, setwholeDay] = useState(props.wholeDay);


  if (inEdit) {
    return (<StyledCard>
      <StyledCardHeader
        title={<Grid container spacing={2} xs={12}>
          <Grid xs={4}>
            <InputLabel htmlFor="titleField">Title</InputLabel>
          </Grid>
          <Grid xs={8}>
            <TextField id="standard-basic" variant="standard" type="text" value={titleVal}
              onChange={(e) => settitleVal(e.target.value)}
            />
          </Grid>
        </Grid>
        }
      />
      <CardContent>
        <Grid xs={12}>
          <Grid item xs={4}>
            <InputLabel htmlFor="dateInput">Date</InputLabel>
            <LocalizationProvider dateAdapter={AdapterDateFns}>

              <DateTimePicker
                defaultValue={startVal}
                value={startVal}
                onChange={(date) => setStartVal(date ?? new Date())}
                ampm={false}
                minDate={new Date("2019-01-01")}
                maxDate={new Date("2100-01-01")}
              />
              <DateTimePicker
                defaultValue={endVal}
                value={endVal}
                onChange={(date) => setEndVal(date ?? new Date())}
                ampm={false}
                minDate={new Date("2019-01-01")}
                maxDate={new Date("2100-01-01")}
              />
            </LocalizationProvider>
            <FormControlLabel
                        control={<Checkbox checked={wholeDayVal} onChange={(e) => {setwholeDay(e.target.checked)}} />}
                        label="Whole day"
                    />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="friendsField">Friends</InputLabel>
            <TextField id="standard-basic" variant="standard" label="Friends" type="text" value={friendsVal}
              onChange={(e) => setfriendsVal(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="locationField">Location</InputLabel>
            <TextField id="standard-basic" variant="standard" label="Location" type="text" value={locationVal}
              onChange={(e) => setlocationVal(e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <InputLabel htmlFor="notesField">Notes</InputLabel>
            <TextField id="standard-basic" variant="standard" label="Notes" type="text" value={notesVal}
              onChange={(e) => setnotesVal(e.target.value)}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <EventButton content='Save' onClick={saveHandler}
        />
      </CardActions>
    </StyledCard>);
  }

  const closeButton = <Button sx={BUTTON_STYLE} onClick={props.closePopover}>Close</Button>

  return <StyledCard>
    <StyledCardHeader
      title={
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Typography variant="h5" color={CARD_TEXT_COLOR}>
          {titleVal}
        </Typography>
        {props.closePopover && closeButton}
        </Stack>
      }
    />
    <CardContent sx={{ textAlign: 'left' }}>
      <Stack>
        <Typography variant="body2" color={CARD_CONTENT_TEXT_COLOR}>
          <DateDisplay startVal={props.start} endVal={props.end} wholeDay={props.wholeDay ?? false} />
        </Typography>
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
      <EventButton content='Edit' onClick={() => {
        setInEdit(true);
      }}
      />
      <EventButton content='Delete' onClick={() => {
        if (window.confirm("You are about to delete this event")) {
          EventApiInstance.destroyEvent(props._id, () => props.deleteHandle(props._id));
          props.closePopover && props.closePopover();
        }
      }}
      />
    </CardActions>
  </StyledCard>;
}

export default EventItem;