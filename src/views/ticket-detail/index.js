// material-ui
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton, CardHeader, TextField, Button, Link } from '@mui/material';
import { ArrowBack, Cancel, CancelOutlined, Circle, CircleRounded, ClearRounded, MoreVert } from '@mui/icons-material';
import { Card, CardContent, CardActionArea, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import QRCode from 'react-qr-code';
import TicketsData from '../../data/tickets';
import { useState } from 'react';

// ==============================|| Ticket detail PAGE ||============================== //

const RefundingRequest = ({ onClose, ticket }) => {
    const theme = useTheme();
    return (
        <Card variant="outlined" sx={{ minWidth: 480 }}>
            <CardHeader
                title={'Ticket Info'}
                action={
                    <IconButton aria-label="close" onClick={onClose}>
                        <ClearRounded />
                    </IconButton>
                }
            ></CardHeader>
            <CardContent>
                <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                    <Typography>Event Name</Typography>
                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.event_name}</Typography>
                </Grid>
                <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                    <Typography>Ticket Type</Typography>
                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.tickettype}</Typography>
                </Grid>
                <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                    <Typography>Total</Typography>
                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.price + ' ETB'}</Typography>
                </Grid>
                <Grid sx={{ mb: 1.5 }}>
                    <Typography fontSize={theme.typography.h3} fontWeight={theme.typography.fontWeightBold} sx={{ mb: 1.5 }}>
                        Refunding Reason
                    </Typography>
                    <TextField
                        variant="filled"
                        sx={{
                            '& .MuiFilledInput-root': {
                                borderBottom: 'none',
                                '&:before': {
                                    borderBottom: 'none'
                                },
                                '&:after': {
                                    borderBottom: 'none'
                                }
                            }
                        }}
                        fullWidth
                        multiline
                        minRows={5}
                        size="small"
                        placeholder="write here"
                    ></TextField>
                </Grid>
                <Grid sx={{ mb: 1.5 }}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: theme.palette.warning.dark,
                            color: 'black',
                            '&hover': { backgroundColor: theme.palette.grey[400] }
                        }}
                    >
                        Send
                    </Button>
                </Grid>
                <Grid>
                    <Typography display={'flex'} justifyContent={'center'} fontSize={theme.typography.subtitle1}>
                        <Link>Refunding Terms </Link> | Terms of Agreement
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

const TicketDetail = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const ticket = TicketsData[0];
    const [anchorEl, setAnchorEl] = useState(null);
    const [showRefundingPage, setShowRefundingPage] = useState(false);

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
        <Grid item xs={12} sm={5} md={5} lg={4} xl={4} style={{ textDecoration: 'none' }}>
            <Grid container display={'flex'} alignItems={'center'} marginBottom={'20px'}>
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
                <Grid item>
                    <Typography variant="h2">Ticket Detail</Typography>
                </Grid>
            </Grid>
            <Grid container mb={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" sx={{ minWidth: 480 }}>
                    <CardHeader
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
                                {showRefundingPage && (
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
                            <Box sx={{ color: 'green' }}>
                                <IconButton>
                                    <Circle style={{ fontSize: 50, color: 'green' }} aria-label="status" />
                                </IconButton>
                                Upcoming
                            </Box>
                        }
                    ></CardHeader>
                    <CardContent>
                        <Grid style={{ margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
                            <QRCode value={ticket.id.toString()} />
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
            <Grid container mb={2} style={{ display: 'flex', justifyContent: 'center' }}>
                <Card variant="outlined" sx={{ minWidth: 480 }}>
                    <CardContent>
                        <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 2 }}>
                            <Typography fontWeight={theme.typography.fontWeightBold}>Buyer Info</Typography>
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
                <Card variant="outlined" sx={{ minWidth: 480 }}>
                    <CardContent>
                        <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 2 }}>
                            <Typography fontWeight={theme.typography.fontWeightBold}>Ticket Info</Typography>
                            <Box sx={{ color: 'green' }}>
                                <IconButton sx={{ fontSize: 12 }}>
                                    <Circle sx={{ color: 'green' }} fontSize="small" aria-label="status" />
                                </IconButton>
                                Upcoming
                            </Box>
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
                            <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.quantity}</Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default TicketDetail;
