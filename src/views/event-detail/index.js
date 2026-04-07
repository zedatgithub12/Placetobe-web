import { useState, useEffect } from 'react';
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton } from '@mui/material';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { ArrowBack, Bookmark, BookmarkBorderOutlined } from '@mui/icons-material';
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
import { TimeFun, renderStatus } from 'utils/function';
import { useSelector, useDispatch } from 'react-redux';
import { bookmarkEvent, unBookmark } from 'store/newstore/bookmarkSlice';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import EventTicket from './components/EventTicket';
import BuyTicket from './components/Tickets/BuyTicket';
import DetailContentSkeleton from './components/Skeleton/DetailContent';

const domain = 'https://placetobeethiopia.com/';
const EventDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const bookmarks = useSelector((state) => state.bookmark.bookmarks);
    const token = localStorage.getItem('token');

    const [eventid, setEventid] = useState(state.id);
    const [loading, setLoading] = useState(false);
    const [eventDetail, setEventDetail] = useState([]);
    const [organizer, setOrganizer] = useState([]);
    const [related, setRelated] = useState([]);
    const [ismarked, setIsMarked] = useState(false);
    const [bookmarkBtnColor, setBookmarkBtnColor] = useState(theme.palette.grey[500]);
    const [bookmarkBtnBackground, setBookmarkBtnBackground] = useState(theme.palette.background.default);

    const FilterCategory = related.filter((event) => event.category === eventDetail.category && event.id != state.id);

    const FetchAdditionalInfo = async () => {
        const controller = new AbortController();
        const signal = controller.signal;

        var ApiUrl = Connections.api + Connections.events;

        // header type for text data to be send to server
        var headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        fetch(ApiUrl, {
            method: 'GET',
            headers: headers,
            signal: signal
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setRelated(response.data.data);
                }
            });

        return () => {
            controller.abort();
        };
    };

    const bookmarked = () => {
        const found = bookmarks.some((event) => event.id === state.id);
        if (found) {
            setBookmarkBtnColor(theme.palette.primary.dark);
            setBookmarkBtnBackground(theme.palette.primary.light);
            setIsMarked(true);
            return true;
        }
        return false;
    };

    useEffect(() => {
        setLoading(true);
        var Api = Connections.api + Connections.eventDetails + eventid;
        fetch(Api, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setEventDetail(response.data);
                    setOrganizer(response.organizer);
                    setLoading(false);
                    FetchAdditionalInfo();
                }
            });
        bookmarked();
        return () => {};
    }, [eventid]);

    const bookmarkTheEvent = () => {
        const find = bookmarks.find((event) => event.id === eventDetail.id);
        if (find) {
            setBookmarkBtnColor(theme.palette.grey[500]);
            setBookmarkBtnBackground(theme.palette.background.default);
            dispatch(unBookmark(eventDetail.id));
            setIsMarked(false);
            handlePrompt('Unbookmarked the event', 'info');
        } else {
            dispatch(bookmarkEvent(eventDetail));
            setBookmarkBtnBackground(theme.palette.primary.light);
            setBookmarkBtnColor(theme.palette.primary.dark);
            setIsMarked(true);
            handlePrompt('Bookmarked the event', 'info');
        }
    };

    const handleCopyLink = () => {
        let sharedEvent = 'event/' + state.id;
        let sharedLink = domain + sharedEvent;

        navigator.clipboard
            .writeText(sharedLink)
            .then(() => {
                handlePrompt('Link copied to clipboard', 'info');
            })
            .catch(() => {
                handlePrompt('Failed to copy link to clipboard', 'error');
            });
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlePrompt = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

    return (
        <>
            <Box>
                <IconButton
                    onClick={() => navigate(-1)}
                    color="secondary"
                    aria-label="back"
                    sx={{ background: theme.palette.background.default, color: theme.palette.grey[800] }}
                >
                    <ArrowBack />
                </IconButton>

                <Grid container marginX="auto">
                    <Grid item xs={12} sm={5.6} md={5.6} lg={4.6} xl={4.6} marginLeft="auto" marginRight="auto">
                        <Box>
                            <OrgMinicard isLoading={loading} name={organizer.business_name} profile={organizer.business_logo} />
                            <Box>
                                {eventDetail.event_image ? (
                                    <LazyLoadImage
                                        component="img"
                                        effect="blur"
                                        delayTime={500}
                                        src={Connections.api + Connections.assets + eventDetail.event_image}
                                        className="img-fluid rounded m-auto me-2"
                                    />
                                ) : (
                                    <Skeleton variant="rectangular" height={320} />
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
                                    {eventDetail.event_description}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={5} xl={5} marginRight="auto">
                        {loading ? (
                            <Grid
                                container
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
                                <DetailContentSkeleton />
                            </Grid>
                        ) : (
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
                                <Grid container>
                                    <Grid item xs={8.5}>
                                        <Typography gutterBottom variant="h3">
                                            {eventDetail.event_name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {token && (
                                            <IconButton
                                                onClick={() => bookmarkTheEvent()}
                                                style={{ backgroundColor: bookmarkBtnBackground }}
                                            >
                                                {ismarked ? (
                                                    <Bookmark fontSize="small" style={{ color: bookmarkBtnColor }} />
                                                ) : (
                                                    <BookmarkBorderOutlined fontSize="small" style={{ color: bookmarkBtnColor }} />
                                                )}
                                            </IconButton>
                                        )}
                                        <IconButton style={{ marginLeft: 6 }} onClick={() => handleCopyLink()}>
                                            <IconLink size={20} />
                                        </IconButton>
                                    </Grid>
                                </Grid>

                                <Box display="flex" alignItems="center" marginBottom={1} marginTop={3}>
                                    <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                        <IconCalendarEvent />
                                    </ListItemIcon>

                                    <Box>
                                        {eventDetail.start_date && eventDetail.start_time && (
                                            <Typography variant="body2" className="fw-semibold">
                                                {new Date(eventDetail.start_date).toDateString()} @ {TimeFun(eventDetail.start_time)}
                                            </Typography>
                                        )}
                                        <Typography variant="subtitle2">Start date and time</Typography>
                                    </Box>
                                </Box>

                                <Box display="flex" alignItems="center" marginBottom={1}>
                                    <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                        <IconCalendarDue />
                                    </ListItemIcon>

                                    <Box>
                                        {eventDetail.end_date && eventDetail.end_time && (
                                            <Typography variant="body2" className="fw-semibold">
                                                {new Date(eventDetail.end_date).toDateString()} @ {TimeFun(eventDetail.end_time)}
                                            </Typography>
                                        )}
                                        <Typography variant="subtitle2">End date and time</Typography>
                                    </Box>
                                </Box>
                                <Box display="flex" alignItems="center" marginBottom={1}>
                                    <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                        <IconCircleCheck />
                                    </ListItemIcon>
                                    <Box>
                                        <Typography variant="body2" className="fw-semibold">
                                            {renderStatus(eventDetail.start_date, eventDetail.end_date)}
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
                                            {eventDetail.event_address}
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
                                            {eventDetail.category}
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
                                            {eventDetail.event_entrance_fee == null ? 'Free' : eventDetail.event_entrance_fee + ' ETB'}
                                        </Typography>

                                        {eventDetail.event_entrance_fee && <Typography variant="subtitle2">Entrance fee</Typography>}
                                    </Box>
                                </Box>
                                {eventDetail.contact_phone && (
                                    <Box display="flex" alignItems="center">
                                        <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                            <IconPhone />
                                        </ListItemIcon>
                                        <Box>
                                            <Typography variant="body2" className="fw-semibold">
                                                {eventDetail.contact_phone}
                                            </Typography>
                                            <Typography variant="subtitle2">Contact phone</Typography>
                                        </Box>
                                    </Box>
                                )}

                                {eventDetail.redirectUrl && (
                                    <Box display="flex" alignItems="center">
                                        <ListItemIcon sx={{ color: theme.palette.warning.dark }}>
                                            <IconLink />
                                        </ListItemIcon>
                                        <Typography
                                            variant="body2"
                                            className="fw-semibold"
                                            component="a"
                                            href={eventDetail.redirectUrl}
                                            target="_blank"
                                            rel="noopener"
                                        >
                                            {eventDetail.redirectUrl}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        )}

                        <EventTicket isLoading={loading} onBuyTicket={handleClickOpen} />
                    </Grid>
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
                                <EventCard events={FilterCategory.slice(0, 8)} onPress={(id) => setEventid(id)} />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {eventDetail && <BuyTicket open={open} event={eventDetail && eventDetail} id={state.id} handleClose={handleClose} />}
        </>
    );
};

const EventCard = ({ events, onPress }) => {
    const theme = useTheme();

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
                        onClick={() => onPress(event.id)}
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
                                            {event.event_entrance_fee == null ? 'Free' : event.event_entrance_fee + ' ETB'}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}

            <SnackbarProvider maxSnack={3} />
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
    ),
    onPress: PropTypes.func
};

export default EventDetail;
