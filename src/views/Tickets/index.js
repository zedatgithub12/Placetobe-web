import { useEffect, useState } from 'react';
import { CircularProgress, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { StatusText, TicketColor } from 'utils/function';
import TicketCard from './components/TicketCard';
import Fallbacks from 'utils/components/Fallbacks';
import Connections from 'api';

const Tickets = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [tickets, setTickets] = useState([]);

    //handle the work to be done when network is available
    useEffect(() => {
        const FeatchTicket = () => {
            const controller = new AbortController();
            const signal = controller.signal;

            const user = JSON.parse(localStorage.getItem('user'));
            const token = localStorage.getItem('token');

            setLoading(true);

            const Api = Connections.api + Connections.boughtTickets + user.id;
            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, {
                method: 'GET',
                headers: headers,
                signal: signal
            })
                .then((reponse) => reponse.json())
                .then((response) => {
                    if (response.success) {
                        setTickets(response.data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setError(true);
                    }
                })
                .catch(() => {
                    setLoading(false);
                    setError(true);
                });

            return () => {
                controller.abort();
            };
        };

        FeatchTicket();
        return () => {};
    }, []);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
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
                        <IconButton sx={{ backgroundColor: theme.palette.grey[50], marginRight: 1.6 }} onClick={() => navigate('/')}>
                            <IconArrowLeft size={20} />
                        </IconButton>
                        <Typography variant="h4">Your tickets</Typography>
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
                        <Grid container sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            {loading ? (
                                <Grid container sx={{ justifyContent: 'center' }}>
                                    <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingY: 4 }}>
                                        <CircularProgress size={20} color="secondary" />
                                    </Grid>
                                </Grid>
                            ) : error ? (
                                <Fallbacks severity="error" title="ooops" description="There is error fetching tickets" />
                            ) : tickets.length === 0 ? (
                                <Fallbacks
                                    severity="empty"
                                    title="No ticket found"
                                    description="There is no ticket found under your profile"
                                />
                            ) : (
                                tickets?.map((item, index) => (
                                    <TicketCard
                                        key={index}
                                        event={item.event_name}
                                        type={item.tickettype}
                                        quantity={item.quantity}
                                        price={item.price}
                                        iconName={item.tickettype}
                                        iconColor={TicketColor(item.tickettype)}
                                        status={item.status}
                                        textColor={StatusText(item.status)}
                                        date={item.created_at}
                                        onPress={() => navigate('/ticket/detail', { state: item })}
                                    />
                                ))
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Tickets;
