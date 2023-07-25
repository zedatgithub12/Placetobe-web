import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LeftCheckout = ({ ticket, event, quantity }) => {
    const eventData = {
        Event: event.event_name,
        Ticket: ticket.tickettype,
        Quantity: quantity,
        Subtotal: `${(ticket.currentprice * quantity).toFixed(2)} ETB`,
        'Transaction Fee': `${(ticket.currentprice * quantity * 0.05).toFixed(2)} ETB`,
        Total: `${(ticket.currentprice * quantity * 1.05).toFixed(2)} ETB`
    };
    return (
        <Box
            width={400}
            height={400}
            display={'flex'}
            justifyContent={'space-between'}
            justifyItems={'space-between'}
            alignItems={'space-between'}
            flexDirection={'column'}
            bgcolor={'grey.200'}
            py={3}
        >
            <Box display={'flex'} justifyItems={'center'} justifyContent={'center'}>
                <Typography variant="h2">Checkout</Typography>
            </Box>
            <Box px={1}>
                {Object.entries(eventData).map(([key, value]) => (
                    <Box key={key} display="flex" justifyContent="space-between" py={1}>
                        <Typography variant="h4" className="fw-semibold">
                            {key}
                        </Typography>
                        <Typography variant="h4">{value}</Typography>
                    </Box>
                ))}
            </Box>
            <Box width={'100%'} px={3} display={'flex'} justifyContent={'space-between'}>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.500',
                        cursor: 'pointer',
                        fontWeight: 300
                    }}
                >
                    Terms of agreement
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.500',
                        cursor: 'pointer',
                        fontWeight: 300
                    }}
                >
                    Refunding Policy
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: 'grey.500',
                        cursor: 'pointer',
                        fontWeight: 300
                    }}
                >
                    Contact Us
                </Typography>
            </Box>
        </Box>
    );
};
LeftCheckout.propTypes = {
    ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        ticket_id: PropTypes.string.isRequired,
        ticket_image: PropTypes.string.isRequired,
        ticket_name: PropTypes.string.isRequired,
        tickettype: PropTypes.string.isRequired,
        currentprice: PropTypes.number.isRequired,
        originalprice: PropTypes.number.isRequired,
        currentamount: PropTypes.number.isRequired,
        addeddate: PropTypes.string.isRequired,
        expireddate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired
    }),
    event: PropTypes.shape({
        event_name: PropTypes.string.isRequired,
        event_image: PropTypes.string.isRequired,
        start_date: PropTypes.string.isRequired,
        end_date: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        event_address: PropTypes.string.isRequired,
        event_entrance_fee: PropTypes.string.isRequired
    }),
    quantity: PropTypes.number.isRequired
};

export default LeftCheckout;
