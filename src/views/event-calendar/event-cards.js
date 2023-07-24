import { Box, Button, Grid } from '@mui/material';

import categories from 'data/calendarIcons'; //category types for the icon

//the event in the calender feteched by its date
function CalenderEventCard(props) {
    const event = props.event;
    const category = categories.find((cat) => cat.title === event.category)
        ? categories.find((cat) => cat.title === event.category)
        : categories.find((cat) => cat.title === 'Others');
    return (
        <Box>
            <Grid container alignItems="center" spacing={1}>
                <Grid item>{category.icon}</Grid>
                <Grid item fontWeight={'bold'}>
                    {event.name}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CalenderEventCard;
