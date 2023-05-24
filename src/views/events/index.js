import React, { useState, useEffect } from 'react';
import { Typography, Box, Tabs, Tab, Paper, IconButton, ListItemIcon, Avatar, Skeleton } from '@mui/material';
import {
    IconMusic,
    IconSportBillard,
    IconArtboard,
    IconMeat,
    IconTree,
    IconCalendar,
    IconMap,
    IconTicket,
    IconClockHour7,
    IconLocation,
    IconMapPin
} from '@tabler/icons';
import { useTheme } from '@mui/material/styles';

import { Grid, Card, CardMedia, CardContent, CardActionArea, List } from '@mui/material';
import { Event, AccessTime, LocationOn, AttachMoney } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// project imports
import Connections from 'api';
import ProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import categories from 'data/categories';
import ImageCarousel from 'utils/image-carousel';

// ==============================|| EVENTS PAGE ||============================== //

const Events = () => {
    const theme = useTheme();
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('TodayEvents.php');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);

    const handleCategoryClick = (category) => {
        setActiveCategory(category.title);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleTabChange = (event, value) => {
        setFilter(value);
        setActiveCategory('All');
    };

    useEffect(() => {
        setLoading(true);
        fetch('https://app.p2b-ethiopia.com/placetobe/' + filter, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((response) => {
                setEvents(response[0].Events);
                setLoading(false);
            });

        return () => {};
    }, [filter]);

    const FilterCategory = events.filter((event) => {
        let isMatch = true;
        if (activeCategory !== 'All') {
            isMatch = isMatch && event.category === activeCategory;
        }

        return isMatch;
    });
    const paginatedData = FilterCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Box>
                <ImageCarousel />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    '-ms-overflow-style': 'none',
                    'scrollbar-width': 'none'
                }}
            >
                {categories.map((category, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 12px',
                            cursor: 'pointer',

                            marginY: 4
                        }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <IconButton
                            className={`${activeCategory && activeCategory.title === category.title ? 'bg-success' : ''}`}
                            sx={{
                                width: 64,
                                height: 64,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                marginBottom: theme.spacing(1),

                                background: theme.palette.background.default,
                                '&.active': {
                                    color: theme.palette.warning.dark
                                }
                            }}
                        >
                            {category.icon}
                        </IconButton>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500, textTransform: 'capitalize', textAlign: 'center' }}>
                            {category.title}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <div>
                <Paper sx={{ marginBottom: theme.spacing(2) }}>
                    <Tabs
                        value={filter}
                        onChange={handleTabChange}
                        indicatorColor="secondary"
                        textColor="blue"
                        centered
                        xs={6}
                        sm={6}
                        lg={6}
                    >
                        <Tab label="Today" value="TodayEvents.php" />
                        <Tab label="This Week" value="WeekEvents.php" />
                        <Tab label="Upcoming" value="UpcomingEvents.php" />
                    </Tabs>
                </Paper>
                {loading ? (
                    <Grid container spacing={2} alignItems="center" style={{ paddingLeft: 20 }}>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} style={{ textDecoration: 'none' }}>
                            <ProductPlaceholder />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} style={{ textDecoration: 'none' }}>
                            <ProductPlaceholder />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} style={{ textDecoration: 'none' }}>
                            <ProductPlaceholder />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} style={{ textDecoration: 'none' }}>
                            <ProductPlaceholder />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4} lg={3} xl={2.4} style={{ textDecoration: 'none' }}>
                            <ProductPlaceholder />
                        </Grid>
                    </Grid>
                ) : (
                    <EventCard events={paginatedData} />
                )}

                {/* filteredEventsByFilter.slice(currentPage, currentPage + eventsPerPage) */}
            </div>
        </>
    );
};

const EventCard = ({ events }) => {
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
        <Grid container spacing={2} alignItems="center" style={{ paddingLeft: 20 }}>
            {events &&
                events.map((event, index) => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        xl={2.4}
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
                                        <ListItemIcon>
                                            <IconCalendar />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {new Date(event.start_date).toDateString()}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon>
                                            <IconClockHour7 />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {TimeFun(event.start_time)}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" marginBottom={1}>
                                        <ListItemIcon>
                                            <IconMapPin />
                                        </ListItemIcon>
                                        <Typography variant="body2" className="fw-semibold">
                                            {event.event_address}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center">
                                        <ListItemIcon>
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

export default Events;
