// material-ui
import React, { useState } from 'react';
import {
    Typography,
    Box,
    Tabs,
    Tab,
    Paper,
    Grid,
    Card,
    CardMedia,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Avatar
} from '@mui/material';
import { IconMusic, IconSportBillard, IconArtboard, IconMeat, IconTree } from '@tabler/icons';
import { useTheme } from '@mui/material/styles';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import EventCard from 'ui-component/eventcard';
import EventsData from 'data/events';

// ==============================|| EVENTS PAGE ||============================== //

const categories = [
    {
        id: 1,
        icon: (
            <Avatar>
                <IconMusic />
            </Avatar>
        ),
        title: 'music'
    },
    {
        id: 2,
        icon: (
            <Avatar>
                <IconSportBillard />
            </Avatar>
        ),
        title: 'sports'
    },
    {
        id: 3,
        icon: (
            <Avatar>
                <IconMeat />
            </Avatar>
        ),
        title: 'food'
    },
    {
        id: 4,
        icon: (
            <Avatar>
                <IconArtboard />
            </Avatar>
        ),
        title: 'art'
    },
    {
        id: 5,
        icon: (
            <Avatar>
                <IconTree />
            </Avatar>
        ),
        title: 'outdoor'
    }
];

const Events = () => {
    const theme = useTheme();
    const [activeCategory, setActiveCategory] = useState(null);
    const [filter, setFilter] = useState('today');

    const handleCategoryClick = (category) => {
        setActiveCategory(category);
    };

    const filteredEvents = EventsData.filter((event) => {
        if (activeCategory) {
            return event.category === activeCategory.title;
        }
        return true;
    });

    const filteredEventsByFilter = filteredEvents.filter((event) => {
        const today = new Date();
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        switch (filter) {
            case 'today':
                return startDate.toDateString() === today.toDateString();
            case 'thisWeek':
                return startDate <= today.setDate(today.getDate() + 7) && endDate >= today;
            case 'upcoming':
                return startDate > today;
            default:
                return true;
        }
    });
    return (
        <>
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
                {categories.map((category) => (
                    <Box
                        key={category.id}
                        className={`${activeCategory && activeCategory.title === category.title ? 'active' : ''}`}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 12px',
                            cursor: 'pointer',
                            '&.active': {
                                color: theme.palette.primary.main
                            },
                            marginY: 4
                        }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        <Box
                            sx={{
                                width: 64,
                                height: 64,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                marginBottom: theme.spacing(1)
                            }}
                        >
                            {category.icon}
                        </Box>
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
                        onChange={(event, value) => setFilter(value)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        xs={6}
                        sm={6}
                        lg={6}
                    >
                        <Tab label="Today" value="today" />
                        <Tab label="This Week" value="thisWeek" />
                        <Tab label="Upcoming" value="upcoming" />
                    </Tabs>
                </Paper>

                <EventCard events={EventsData} />
            </div>
        </>
    );
};

export default Events;
