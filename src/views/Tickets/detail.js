import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons';
import { useLocation, useNavigate } from 'react-router';
import { DateFormatter, StatusText } from 'utils/function';
import InfoCard from './components/InfoCard';
import QRCode from 'react-qr-code';

const TicketDetail = () => {
    const theme = useTheme();
    const { state } = useLocation();
    const navigate = useNavigate();

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: theme.palette.background.default,
                            border: 0.5,
                            borderColor: theme.palette.grey[200],
                            borderRadius: 2,
                            padding: 2
                        }}
                    >
                        <IconButton sx={{ backgroundColor: theme.palette.grey[50], marginRight: 1.6 }} onClick={() => navigate(-1)}>
                            <IconArrowLeft size={20} />
                        </IconButton>
                        <Typography variant="h4">{state.event_name}</Typography>
                    </Grid>
                </Grid>

                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme.palette.background.default,
                        border: 0.5,
                        borderColor: theme.palette.grey[200],
                        borderRadius: 2,
                        padding: 2,
                        marginTop: 2
                    }}
                >
                    <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 4 }}>
                        <QRCode size={250} style={{ height: 'auto', maxWidth: '100%', width: '80%' }} value={state.id} />
                    </Grid>
                </Grid>

                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme.palette.background.default,
                        border: 0.5,
                        borderColor: theme.palette.grey[200],
                        borderRadius: 2,
                        padding: 2,
                        marginTop: 2
                    }}
                >
                    <Grid item xs={12}>
                        <InfoCard title="Buyer info">
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Full name</Typography>
                                <Typography variant="subtitle1">{state.username}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Phone</Typography>
                                <Typography variant="subtitle1">{state.phone}</Typography>
                            </Box>
                        </InfoCard>
                    </Grid>
                </Grid>

                <Grid
                    container
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme.palette.background.default,
                        border: 0.5,
                        borderColor: theme.palette.grey[200],
                        borderRadius: 2,
                        padding: 2,
                        marginTop: 1
                    }}
                >
                    <Grid item xs={12}>
                        <InfoCard
                            title="Ticket info"
                            actions={
                                <Typography
                                    variant="body1"
                                    sx={{
                                        backgroundColor: StatusText(state.status),
                                        textTransform: 'capitalize',
                                        paddingX: 3,
                                        paddingY: 0.3,
                                        borderRadius: 10
                                    }}
                                >
                                    {state.status}
                                </Typography>
                            }
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Event name</Typography>
                                <Typography
                                    variant="subtitle1"
                                    onClick={() =>
                                        navigate('/event-detail', {
                                            state: { ...state }
                                        })
                                    }
                                    sx={{ cursor: 'pointer', ':hover': { color: theme.palette.secondary.dark } }}
                                >
                                    {state.event_name}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Ticket type</Typography>
                                <Typography variant="subtitle1">{state.tickettype}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Quantity</Typography>
                                <Typography variant="subtitle1">{state.quantity}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Each price</Typography>
                                <Typography variant="subtitle1">{state.price} Birr</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Payment Gateway</Typography>
                                <Typography variant="subtitle1">{state.p_gateway ? state.p_gateway : 'Not Payed'}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 2 }}>
                                <Typography variant="subtitle2">Bought on</Typography>
                                <Typography variant="subtitle1">{DateFormatter(state.date)}</Typography>
                            </Box>
                        </InfoCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default TicketDetail;
