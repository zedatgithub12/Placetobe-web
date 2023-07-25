import * as React from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton } from '@mui/material';
import LocalActivityOutlinedIcon from '@mui/icons-material/LocalActivityOutlined';
import TicketsData from '../../data/events';
import { TicketCard } from './components/TicketCard';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export default function EventDetailTab({ event }) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '80%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ backgroundColor: 'white' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab icon={<MapOutlinedIcon />} iconPosition="start" label="Map" value="1" />
                        <Tab icon={<LocalActivityOutlinedIcon />} iconPosition="start" label="Tickets" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ backgroundColor: '#f9f9f9', width: '100%' }}>
                    <LazyLoadImage
                        component="img"
                        src={'https://www.jlexart.com/media/upload/9351_612790f47a1dcfe19a4b.jpg'}
                        width={'100%'}
                        height={400}
                        className="img-fluid rounded m-auto me-1"
                        placeholder={<Skeleton variant="rectangular" height={400} width={1000} />}
                    />
                </TabPanel>
                <TabPanel value="2" sx={{ backgroundColor: '#f9f9f9', height: 'auto', width: '100%' }}>
                    <Box>
                        <TicketCard event={event} tickets={TicketsData} />
                    </Box>
                </TabPanel>
            </TabContext>
        </Box>
    );
}

EventDetailTab.propTypes = {
    event: PropTypes.shape({
        event_name: PropTypes.string.isRequired,
        event_image: PropTypes.string.isRequired,
        start_date: PropTypes.string.isRequired,
        end_date: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        event_address: PropTypes.string.isRequired,
        event_entrance_fee: PropTypes.string.isRequired
    })
};
