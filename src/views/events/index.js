import { useState, useEffect } from 'react';
import {
    Typography,
    Box,
    Tabs,
    Tab,
    Paper,
    IconButton,
    ListItemIcon,
    Skeleton,
    OutlinedInput,
    InputAdornment,
    ButtonBase
} from '@mui/material';
import { IconCalendar, IconTicket, IconClockHour7, IconMapPin, IconSearch } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';
import { Grid, Card, CardContent, CardActionArea } from '@mui/material';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
// project imports
import Connections from 'api';
import ProductPlaceholder from 'ui-component/cards/Skeleton/ProductPlaceholder';
import categories from 'data/categories';
import ImageCarousel from 'utils/image-carousel';
import { useNavigate } from 'react-router-dom';

// ==============================|| EVENTS PAGE ||============================== //

const Events = () => {
    const theme = useTheme();
    const [searchText, setSearchText] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState('today-events');
    const [page] = useState(0);
    const [rowsPerPage] = useState(12);

    const handleCategoryClick = (category) => {
        if (activeCategory === category.title) {
            setActiveCategory('All');
        } else {
            setActiveCategory(category.title);
        }
    };

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleTabChange = (event, value) => {
        setFilter(value);
        setSearchText('');
    };

    useEffect(() => {
        const handleFetchingDetail = () => {
            setLoading(true);
            fetch(Connections.api + filter, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setEvents(response.data);
                        setLoading(false);
                    }
                });
        };

        handleFetchingDetail();

        return () => {};
    }, [filter]);

    const FilterCategory = events.filter((event) => {
        let isMatch = true;

        if (searchText) {
            const searchRegex = new RegExp(searchText, 'i');
            isMatch = isMatch && (searchRegex.test(event.event_name) || searchRegex.test(event.event_address));
        }

        if (activeCategory !== 'All') {
            isMatch = isMatch && event.category === activeCategory;
        }

        return isMatch;
    });
    const paginatedData = FilterCategory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <>
            <Box>
                <Grid container>
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Box>
                            <Typography variant="h2" sx={{ textAlign: 'center', marginY: 2 }}>
                                All Events Happening In Ethiopia
                            </Typography>
                            <OutlinedInput
                                id="input-search-header"
                                value={searchText}
                                onChange={handleSearchTextChange}
                                placeholder="Search"
                                sx={{
                                    width: 634,

                                    [theme.breakpoints.down('lg')]: {
                                        width: 434
                                    },
                                    [theme.breakpoints.down('md')]: {
                                        width: '100%',
                                        background: '#fff'
                                    }
                                }}
                                startAdornment={
                                    <InputAdornment position="start">
                                        <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <ButtonBase sx={{ borderRadius: '12px' }}>
                                            {/* a component to filter the events */}
                                            {/* <HeaderAvatarStyle variant="rounded">
                                    <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
                                </HeaderAvatarStyle> */}
                                        </ButtonBase>
                                    </InputAdornment>
                                }
                                aria-describedby="search-helper-text"
                                inputProps={{ 'aria-label': 'weight' }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',

                    [theme.breakpoints.up('sm')]: {
                        justifyContent: 'center'
                    },
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
                            marginY: 2
                        }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <IconButton
                            sx={{
                                width: 64,
                                height: 64,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                marginBottom: theme.spacing(1),

                                background:
                                    activeCategory && activeCategory === category.title
                                        ? theme.palette.warning.dark
                                        : theme.palette.background.default
                            }}
                        >
                            {category.icon}
                        </IconButton>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                textAlign: 'center'
                            }}
                            className="categoryname"
                        >
                            {category.title}
                        </Typography>
                    </Box>
                ))}
            </Box>

            <Box gutterBottom>
                <Grid container marginY={2} justifyContent={'center'}>
                    <Grid item xs={12} sm={12} md={10} lg={10} xl={10} sx={{ justifyContent: 'center' }}>
                        <Paper
                            paddingX={3}
                            sx={{ marginBottom: theme.spacing(2), display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        >
                            <Tabs
                                value={filter}
                                onChange={handleTabChange}
                                textColor="inherit"
                                TabIndicatorProps={{ style: { backgroundColor: '#ffbb00' } }}
                                sx={{ paddingTop: 1 }}
                            >
                                <Tab label="Today" value="today-events" />
                                <Tab label="This Week" value="week-events" />
                                <Tab label="Upcoming" value="upcoming-events" />
                            </Tabs>
                        </Paper>
                    </Grid>
                </Grid>
                {loading ? (
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <Grid container spacing={2} alignItems="center">
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
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <EventCard events={paginatedData.slice(0, 5)} />
                        </Grid>
                    </Grid>
                )}

                {paginatedData.length >= 4 && (
                    <Box marginY={4}>
                        <Grid container justifyContent="center">
                            <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                                <ImageCarousel />
                            </Grid>
                        </Grid>
                    </Box>
                )}

                {loading ? (
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <Grid container spacing={2} alignItems="center">
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
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container justifyContent="center">
                        <Grid item xs={12} sm={12} md={10} lg={10} xl={10}>
                            <EventCard events={paginatedData.slice(5, paginatedData.length)} />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </>
    );
};

const EventCard = ({ events }) => {
    const theme = useTheme();
    const navigate = useNavigate();
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
        <Grid container spacing={2}>
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
                            navigate('/event-detail', {
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
                                    <Typography gutterBottom variant="h4">
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
