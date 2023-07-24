import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import categories from 'data/calendarIcons'; //category types for the icon

//the event in the calender feteched by its date
function CalenderEventCard(props) {
    const event = props.event;
    const navigate = useNavigate();
    const category = categories.find((cat) => cat.title === event.category)
        ? categories.find((cat) => cat.title === event.category)
        : categories.find((cat) => cat.title === 'Others');
    const name = event.name.length > 17 ? event.name.slice(0, 17) + '...' : event.name;

    return (
        <Box
            mb={1}
            onClick={() =>
                navigate('/event-detail', {
                    state: { ...event }
                })
            }
        >
            <Grid container alignItems="center" spacing={1}>
                <Grid item>{category.icon}</Grid>
                <Grid item fontWeight={'medium'}>
                    {name}
                </Grid>
            </Grid>
        </Box>
    );
}

export default CalenderEventCard;
