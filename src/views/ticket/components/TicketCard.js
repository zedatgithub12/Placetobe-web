import { useState, useEffect } from 'react';
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton } from '@mui/material';
import Modal from '@mui/material/Modal';
import { ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { IconTicket } from '@tabler/icons';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import PaymentStepper from './PaymentStepper';

export const TicketCard = ({ tickets, event }) => {
    const theme = useTheme();
    return (
        <Grid container spacing={2} marginBottom={1}>
            {tickets && tickets.map((ticket) => <PaymentStepper event={event} key={ticket.id} ticket={ticket} />)}
        </Grid>
    );
};

TicketCard.propTypes = {
    tickets: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            userId: PropTypes.string.isRequired,
            event_id: PropTypes.string.isRequired,
            event_image: PropTypes.string.isRequired,
            event_name: PropTypes.string.isRequired,
            tickettype: PropTypes.string.isRequired,
            currentprice: PropTypes.number.isRequired,
            originalprice: PropTypes.number.isRequired,
            currentamount: PropTypes.number.isRequired,
            addeddate: PropTypes.string.isRequired,
            expireddate: PropTypes.string.isRequired,
            status: PropTypes.string.isRequired,
            created_at: PropTypes.string.isRequired,
            updated_at: PropTypes.string.isRequired
        })
    ),
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
