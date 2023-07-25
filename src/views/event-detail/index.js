import { useState, useEffect } from 'react';
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton } from '@mui/material';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import OrgMinicard from 'ui-component/organizer/OrgMinicard';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Connections from 'api';
import {
    IconCalendar,
    IconTicket,
    IconClockHour7,
    IconMapPin,
    IconCategory,
    IconPhone,
    IconLink,
    IconCircleCheck,
    IconCalendarDue,
    IconCalendarEvent
} from '@tabler/icons';
import PropTypes from 'prop-types';
import ProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import EventDetailTab from '../ticket/index';

const EventDetail = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [related, setRelated] = useState([]);
    const { state } = useLocation();
    const theme = useTheme();
    console.log(related);

    const FilterCategory = related.filter((event) => event.category === state.category && event.event_id !== state.event_id);

    const TimeFun = (eventTime) => {
        var time = eventTime;
        var result = time.slice(0, 2);
        var minute = time.slice(3, 5);
        var globalTime;
        var postMeridian;
        var separator = ':';
        if (result > 12) {
            postMeridian = result - 12;
            globalTime = 'PM';
        } else {
            postMeridian = result;
            globalTime = 'AM';
        }

        return postMeridian + separator + minute + ' ' + globalTime;
    };
    const renderStatus = (startingDate, endingDate) => {
        var currentStatus;
        var Happening = 'Happening';
        var Upcoming = 'Upcoming';
        var Passed = 'Expired';

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        if (startingDate == today || (startingDate < today && endingDate >= today)) {
            currentStatus = Happening;
        } else if (startingDate > today) {
            currentStatus = Upcoming;
        } else {
            currentStatus = Passed;
        }

        return currentStatus;
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://app.p2b-ethiopia.com/placetobe/search.php', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((response) => {
                setRelated(response[0].Filtered);
                setLoading(false);
            });

        return () => {};
    }, []);
    return (
        <>
            <Box>
                <IconButton
                    onClick={() => navigate('/')}
                    color="secondary"
                    aria-label="back"
                    sx={{ background: theme.palette.background.default, color: theme.palette.grey[800] }}
                >
                    <ArrowBack />
                </IconButton>

                <Grid container marginX="auto">
                    <Grid item xs={12} sm={5} md={5} lg={4} xl={4} marginLeft="auto" marginRight="auto">
                        <Box>
                            <OrgMinicard
                                isLoading={loading}
                                name={state.event_organizer}
                                category={state.category}
                                profile={state.event_image}
                            />
                            <Box>
                                {state.event_image ? (
                                    <LazyLoadImage
                                        component="img"
                                        effect="blur"
                                        delayTime={500}
                                        src={Connections.api + Connections.assets + state.event_image}
                                        className="img-fluid rounded m-auto me-2"
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" height={220} />
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4} md={4} lg={5} xl={5} marginRight="auto">
                        <Box
                            marginY={2}
                            sx={{
                                background: theme.palette.background.default,
                                borderRadius: 3,
                                width: '100%',
                                padding: 1,
                                '& > *': {
                                    margin: theme.spacing(2)
                                }
                            }}
                        >
                            <Typography gutterBottom variant="h3">
                                {state.event_name}
                            </Typography>

                            <Box display="flex" alignItems="center" marginBottom={1} marginTop={3}>
                                <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                    <IconCalendarEvent />
                                </ListItemIcon>

                                <Box>
                                    <Typography variant="body2" className="fw-semibold">
                                        {new Date(state.start_date).toDateString().slice(0, 10)} @{TimeFun(state.start_time)}
                                    </Typography>
                                    <Typography variant="subtitle2">Start date and time</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" marginBottom={1}>
                                <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                    <IconCalendarDue />
                                </ListItemIcon>

                                <Box>
                                    <Typography variant="body2" className="fw-semibold">
                                        {new Date(state.end_date).toDateString().slice(0, 10)} @{TimeFun(state.end_time)}
                                    </Typography>
                                    <Typography variant="subtitle2">End date and time</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" marginBottom={1}>
                                <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                    <IconCircleCheck />
                                </ListItemIcon>
                                <Box>
                                    <Typography variant="body2" className="fw-semibold">
                                        {renderStatus(state.start_date, state.end_date)}
                                    </Typography>
                                    <Typography variant="subtitle2">Status</Typography>
                                </Box>
                            </Box>
                            <Box display="flex" alignItems="center" marginBottom={1}>
                                <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                    <IconMapPin />
                                </ListItemIcon>

                                <Box>
                                    <Typography variant="body2" className="fw-semibold">
                                        {state.event_address}
                                    </Typography>
                                    <Typography variant="subtitle2">Event Address</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                    <IconCategory />
                                </ListItemIcon>

                                <Box>
                                    <Typography variant="body2" className="fw-semibold">
                                        {state.category}
                                    </Typography>
                                    <Typography variant="subtitle2">Category</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center">
                                <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                    <IconTicket />
                                </ListItemIcon>

                                <Box>
                                    <Typography variant="body2" className="fw-semibold">
                                        {state.event_entrance_fee === '0' ? 'Free' : state.event_entrance_fee + ' ETB'}
                                    </Typography>
                                    <Typography variant="subtitle2">Entrance fee</Typography>
                                </Box>
                            </Box>
                            {state.contact_phone && (
                                <Box display="flex" alignItems="center">
                                    <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                        <IconPhone />
                                    </ListItemIcon>
                                    <Typography variant="body2" className="fw-semibold">
                                        {state.contact_phone}
                                    </Typography>
                                </Box>
                            )}

                            {state.redirectUrl && (
                                <Box display="flex" alignItems="center">
                                    <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                        <IconLink />
                                    </ListItemIcon>
                                    <Typography
                                        variant="body2"
                                        className="fw-semibold"
                                        component="a"
                                        href={state.redirectUrl}
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {state.redirectUrl}
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        <Box
                            marginY={2}
                            sx={{
                                background: theme.palette.background.default,
                                borderRadius: 3,
                                width: '100%',
                                padding: 2,
                                '& > *': {
                                    margin: theme.spacing(2)
                                }
                            }}
                        >
                            <Typography gutterBottom variant="h5">
                                Description
                            </Typography>
                            <Typography gutterBottom variant="body2" lineHeight={1.5}>
                                {state.event_description}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>

                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                    <EventDetailTab event={state} />
                </Grid>

                <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 4 }}>
                    <Grid item xs={12} md={12} sm={12} lg={10} xl={10}>
                        <Box>
                            {FilterCategory.length >= 1 && (
                                <Typography variant="h2" marginTop={4} marginBottom={2}>
                                    Related Events
                                </Typography>
                            )}
                            {loading ? (
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ textDecoration: 'none' }}>
                                        <ProductPlaceholder />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ textDecoration: 'none' }}>
                                        <ProductPlaceholder />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ textDecoration: 'none' }}>
                                        <ProductPlaceholder />
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{ textDecoration: 'none' }}>
                                        <ProductPlaceholder />
                                    </Grid>
                                </Grid>
                            ) : (
                                <EventCard events={FilterCategory.slice(0, 8)} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

const EventCard = ({ events }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    //a function which arrange a time to human readable format
    const TimeFun = (eventTime) => {
        var time = eventTime;
        var result = time.slice(0, 2);
        var minute = time.slice(3, 5);
        var globalTime;
        var postMeridian;
        var separator = ':';
        if (result > 12) {
            postMeridian = result - 12;
            globalTime = 'PM';
        } else {
            postMeridian = result;
            globalTime = 'AM';
        }

        return postMeridian + separator + minute + ' ' + globalTime;
    };

    return (
        <Grid container spacing={2} marginBottom={1}>
            {events &&
                events.map((event, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={3}
                        key={index}
                        onClick={() =>
                            navigate('', {
                                state: { ...event }
                            })
                        }
                        style={{ textDecoration: 'none' }}
                    >
                        <Card variant="outlined">
                            <CardActionArea>
                                {event.event_image ? (
                                    <LazyLoadImage
                                        component="img"
                                        effect="blur"
                                        delayTime={500}
                                        src={Connections.api + Connections.assets + event.event_image}
                                        className="img-fluid rounded m-auto me-2"
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" height={220} />
                                )}

                                <CardContent>
                                    <Typography gutterBottom variant="h3">
                                        {event.event_name}
                                    </Typography>

                                    <Box display="flex" alignItems="center" marginBottom={1} marginTop={2}>
                                        <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                            <IconCalendar />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {new Date(event.start_date).toDateString()}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                            <IconClockHour7 />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {TimeFun(event.start_time)}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                            <IconMapPin />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {event.event_address}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                            <IconTicket />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {event.event_entrance_fee === '0' ? 'Free' : event.event_entrance_fee + ' ETB'}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
};
EventCard.propTypes = {
    events: PropTypes.arrayOf(
        PropTypes.shape({
            event_name: PropTypes.string.isRequired,
            event_image: PropTypes.string.isRequired,
            start_date: PropTypes.string.isRequired,
            end_date: PropTypes.string.isRequired,
            start_time: PropTypes.string.isRequired,
            end_time: PropTypes.string.isRequired,
            event_address: PropTypes.string.isRequired,
            event_entrance_fee: PropTypes.string.isRequired
        })
    )
};

export default EventDetail;
