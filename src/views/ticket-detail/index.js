// material-ui
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton, CardHeader, TextField, Button, Link, Divider } from '@mui/material';
import { ArrowBack, Cancel, CancelOutlined, Circle, CircleRounded, ClearRounded, MoreVert } from '@mui/icons-material';
import { Card, CardContent, CardActionArea, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import QRCode from 'react-qr-code';
import TicketsData from '../../data/tickets';
import { useState } from 'react';
import RefundingRequest from './refundingRequest';

// ==============================|| TICKET DETAIL PAGE ||============================== //

const TicketDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const ticket = TicketsData[0];
    const [anchorEl, setAnchorEl] = useState(null);
    const [showRefundingPage, setShowRefundingPage] = useState(false);
    let statusColor, quantityNumeral;
    const numeralStrings = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    // #0075FF -> blue
    // #D4E8FF -> light blue
    // #21A600 -> green
    // #E60000 -> red
    if (ticket.quantity <= 10) {
        quantityNumeral = numeralStrings[ticket.quantity - 1];
    } else quantityNumeral = ticket.quantity;

    switch (ticket.status) {
        case 'upcoming':
            statusColor = '#21A600';
            break;
        case 'attended':
            statusColor = '#0075FF ';
            break;
        case 'cancelled':
            statusColor = '#E60000';
            break;
        default:
            statusColor = 'gray';
            break;
    }

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleOptionClick = (option) => {
        //add option responses here for more options
        if (option === 'request refunding') {
            setShowRefundingPage(true);
            handleMenuClose();
        }
    };
    const handleRefundingPageClose = () => {
        setShowRefundingPage(false);
    };

    return (
        <Grid style={{ textDecoration: 'none' }}>
            <Grid container display={'flex'} alignItems={'center'} mb={1}>
                <Grid item marginRight={'10px'}>
                    <IconButton
                        onClick={() => navigate('/')}
                        color="secondary"
                        aria-label="back"
                        sx={{ background: theme.palette.background.default, color: theme.palette.grey[800] }}
                    >
                        <ArrowBack />
                    </IconButton>
                </Grid>
                {/* first card which contain the qr code */}
                <Grid item>
                    <Typography variant="h2">Ticket Detail</Typography>
                </Grid>
            </Grid>
            <Grid container mb={1} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" sx={{ minWidth: 480 }}>
                    <CardHeader
                        sx={{
                            padding: '12px'
                        }}
                        action={
                            <div>
                                <IconButton aria-label="more options" aria-controls="options-menu" onClick={handleMenuOpen}>
                                    <MoreVert />
                                </IconButton>
                                <Menu
                                    id="options-menu"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left'
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right'
                                    }}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={() => handleOptionClick('request refunding')}>Request Refunding</MenuItem>
                                    <MenuItem onClick={() => handleOptionClick('refunding policy')}>Refunding Policy</MenuItem>
                                    <MenuItem onClick={() => handleOptionClick('terms')}>Terms and Agreement</MenuItem>
                                </Menu>
                                {showRefundingPage && ( //this div will create the popup window effect
                                    <div
                                        style={{
                                            position: 'fixed',
                                            top: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '100%',
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            zIndex: 1000
                                        }}
                                    >
                                        <RefundingRequest onClose={handleRefundingPageClose} ticket={ticket} />
                                    </div>
                                )}
                            </div>
                        }
                        subheader={
                            <Box sx={{ color: statusColor }}>
                                <IconButton>
                                    <Circle style={{ fontSize: 12, color: statusColor }} aria-label="status" />
                                </IconButton>
                                {ticket.status}
                            </Box>
                        }
                    ></CardHeader>
                    <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px' }}>
                        <Box border={0.2} borderColor={'black'} borderRadius={'5px'} style={{ display: 'inline-flex', padding: '32px' }}>
                            <QRCode size={192} value={ticket.id.toString()} style={{ display: 'inline-block' }} />
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container mb={1} style={{ display: 'flex', justifyContent: 'center' }}>
                {/* second box which contain buyer info */}
                <Card variant="outlined" sx={{ minWidth: 480 }}>
                    <CardContent>
                        <Grid sx={{ mb: 2 }}>
                            <Typography fontWeight={theme.typography.fontWeightBold}>Buyer Info</Typography>
                            <Divider sx={{ margin: '5px 0px' }} />
                        </Grid>
                        <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                            <Typography>Full Name</Typography>
                            <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.username}</Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'space-between'}>
                            <Typography>Phone</Typography>
                            <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.phone}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container style={{ display: 'flex', justifyContent: 'center' }}>
                {/* third box which contain the ticket info */}
                <Card variant="outlined" sx={{ minWidth: 480 }}>
                    <CardContent>
                        <Grid sx={{ mb: 2 }}>
                            <Grid display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                <Typography fontWeight={theme.typography.fontWeightBold}>Ticket Info</Typography>
                                <Box sx={{ color: statusColor }}>
                                    <IconButton>
                                        <Circle style={{ color: statusColor, fontSize: 12 }} aria-label="status" />
                                    </IconButton>
                                    {ticket.status}
                                </Box>
                            </Grid>
                            <Divider sx={{ margin: '5px 0px' }} />
                        </Grid>

                        <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                            <Typography>Event Name</Typography>
                            <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.event_name}</Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                            <Typography>Ticket Type</Typography>
                            <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.tickettype}</Typography>
                        </Grid>
                        <Grid display={'flex'} justifyContent={'space-between'}>
                            <Typography>Quantity</Typography>
                            <Typography fontWeight={theme.typography.fontWeightBold}>{quantityNumeral}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default TicketDetail;
