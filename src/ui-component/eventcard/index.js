import { Typography, Grid, Box, Card, CardMedia, CardContent, CardActionArea, ListItemIcon } from '@mui/material';
import { Event, AccessTime, LocationOn, AttachMoney } from '@mui/icons-material';
import PropTypes from 'prop-types';

function EventCard({ events }) {
    return (
        <Grid container spacing={5} alignItems="center" style={{ paddingLeft: 20 }}>
            {events &&
                events.map((event, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={3}
                        xl={3}
                        key={index}
                        onClick={() =>
                            navigate('/view-event', {
                                state: { ...event }
                            })
                        }
                        style={{ textDecoration: 'none' }}
                    >
                        <Card variant="outlined">
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={event.event_image ? event.event_image : event.event_image + '646137991fd91.jpg'}
                                    alt={event.event_name}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {event.event_name}
                                    </Typography>

                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon sx={{ minWidth: 32 }}>
                                            <Event />
                                        </ListItemIcon>
                                        <Typography variant="body2">
                                            {event.start_date} - {event.end_date}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon>
                                            <AccessTime />
                                        </ListItemIcon>
                                        <Typography variant="body2">
                                            {event.start_time} - {event.end_time}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon>
                                            <LocationOn />
                                        </ListItemIcon>
                                        <Typography variant="body2">{event.event_address}</Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <ListItemIcon>
                                            <AttachMoney />
                                        </ListItemIcon>
                                        <Typography variant="body2">{event.event_entrance_fee}</Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
}
EventCard.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            startDate: PropTypes.string.isRequired,
            endDate: PropTypes.string.isRequired,
            startTime: PropTypes.string.isRequired,
            endTime: PropTypes.string.isRequired,
            venue: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired
        })
    ).isRequired
};
export default EventCard;
