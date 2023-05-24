import { Typography, Grid, Box, Card, CardMedia, CardContent, CardActionArea, List, ListItemIcon } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Event, CalendarToday, AccessTime, LocationOn, AttachMoney } from '@mui/icons-material';

function EventCard({ events }) {
    const theme = useTheme();
    return (
        <Grid container spacing={3} alignItems="center" style={{ paddingLeft: 20 }}>
            {events.map((event, index) => (
                <Grid
                    item
                    xs={12}
                    sm={6}
                    md={6}
                    lg={4}
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
                                image={event.image ? event.image : event.image + '646137991fd91.jpg'}
                                alt={event.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {event.name}
                                </Typography>

                                <Box display="flex" alignItems="center" marginBottom={1}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                        <Event />
                                    </ListItemIcon>
                                    <Typography variant="body2">
                                        {event.startDate} - {event.endDate}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" marginBottom={1}>
                                    <ListItemIcon>
                                        <AccessTime />
                                    </ListItemIcon>
                                    <Typography variant="body2">
                                        {event.startTime} - {event.endTime}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" marginBottom={1}>
                                    <ListItemIcon>
                                        <LocationOn />
                                    </ListItemIcon>
                                    <Typography variant="body2">{event.venue}</Typography>
                                </Box>
                                <Box display="flex" alignItems="center">
                                    <ListItemIcon>
                                        <AttachMoney />
                                    </ListItemIcon>
                                    <Typography variant="body2">{event.price}</Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export default EventCard;
