import { useState, Fragment, useEffect } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { Box, Button, CircularProgress, Dialog, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { addTicket } from 'store/slice/Tickets';
import { useDispatch, useSelector } from 'react-redux';
import { IconArrowLeft } from '@tabler/icons';
import { PaymentGateways } from 'data/PaymentGateways';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AgreementLinks from 'ui-component/Agreements';
import PersonalInfo from './PersonalInfo';
import Gateways from './Gateways';
import Connections from 'api';
import PropTypes from 'prop-types';
import ListTicket from './ListTicket';
import Fallbacks from 'utils/components/Fallbacks';
import WithMPesa from './withMpesa';

function BuyTicket({ id, open, event, handleClose }) {
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [ticket, setTickets] = useState([]);
    const [active, setActiveIndex] = useState();
    const [selectedTicket, setSelectedTicket] = useState();
    const [price, setPrice] = useState(0);
    const [disable, setDisable] = useState(false);

    const theme = useTheme();
    const [activePanel, setActivePanel] = useState('buy');
    const [selection, setSelection] = useState(null);
    const [gateway, setGateway] = useState();
    const [paymentloader, setPaymentLoader] = useState(false);

    //check if the app is opened in payment processor mini app
    const agent = sessionStorage.getItem('agent');

    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.ticket);

    const handlechange = (index) => {
        const newItem = tickets[index];
        const newUpdate = { ...newItem, open: false };
        dispatch(addTicket(newUpdate));
    };

    //increase count of an item
    const handleIncrement = (identity) => {
        ticket.map((item) => {
            if (item.id === identity) {
                setAmount(amount + 1);
                if (amount === 0) {
                    setPrice(item.currentprice);
                    setSelectedTicket(item);
                }
            }
            return item;
        });
    };

    //Decrease count of an item
    const handleDecrement = (identity) => {
        ticket.map((item) => {
            if (item.id === identity && amount > 0) {
                setAmount(amount - 1);
                setPrice(item.currentprice);
            }
            return item;
        });
    };

    const handlePrompts = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

    useEffect(() => {
        /****************************************************** */
        //featch Tickets
        /***************************************************** */
        const FetchTicket = () => {
            const controller = new AbortController();
            const signal = controller.signal;
            const token = localStorage.getItem('token');
            var Api = Connections.api + Connections.eventTicket + id;
            var headers = {
                Authorizatiob: `Bearer ${token}`,
                accept: 'application/json',
                'Content-Type': 'application/json'
            };

            fetch(Api, {
                method: 'GET',
                headers: headers,
                signal: signal
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        setTickets(response.data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                        setTickets(response.data);
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    handlePrompts(error.message, 'error');
                });

            return () => {
                controller.Abort();
            };
        };
        FetchTicket();

        return () => {};
    }, [id]);

    const ChooseGateway = (gateway) => {
        if (selection === gateway.name) {
            setSelection(null);
            setGateway(null);
        } else {
            setSelection(gateway.name);
            setGateway(gateway.name);
        }
    };

    const handlePayment = (values) => {
        if (values.phone.charAt(0) != 0) {
            handlePrompts('The phone number must start with 09 or 07', 'error');
            return;
        }
        setPaymentLoader(true);
        const user = JSON.parse(localStorage.getItem('user'));

        const Api = Connections.api + Connections.Payment;
        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const Data = {
            id: selectedTicket.id,
            userId: user?.id,
            eventId: selectedTicket.event_id,
            eventName: selectedTicket.event_name,
            type: selectedTicket.tickettype,
            quantity: amount,
            eachprice: selectedTicket.currentprice,
            gateway: gateway,
            username: values.full_name,
            phone: values.phone
        };

        fetch(Api, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(Data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setPaymentLoader(false);
                    handlePrompts(`Redirecting to ${gateway}, please wait...`, 'info');
                    window.location.href = response.data;
                } else {
                    setPaymentLoader(false);
                    handlePrompts(response.message, 'error');
                }
            })
            .catch((error) => {
                setPaymentLoader(false);
                handlePrompts(error.message, 'error');
            });
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <Grid container sx={{ padding: 2 }}>
                    <Grid item xs={12}>
                        {activePanel === 'checkout' ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <IconButton onClick={() => setActivePanel('buy')} sx={{ marginRight: 1 }}>
                                    <IconArrowLeft size={18} />
                                </IconButton>
                                <Typography variant="h3" color="secondary">
                                    Checkout
                                </Typography>
                            </Box>
                        ) : (
                            <Typography variant="h3" color="secondary">
                                {event.event_name}
                            </Typography>
                        )}

                        <Grid container padding={1} sx={{ minHeight: '50dvh' }}>
                            {activePanel === 'buy' ? (
                                <Grid item xs={12} sx={{ position: 'relative' }}>
                                    <Typography variant="subtitle1" sx={{ marginY: 1.4 }}>
                                        Available Tickets
                                    </Typography>

                                    {loading ? (
                                        <Grid container>
                                            <Grid item xs={12} sx={{ padding: 8 }}>
                                                <CircularProgress size={20} />
                                            </Grid>
                                        </Grid>
                                    ) : ticket.length === 0 ? (
                                        <Fallbacks severity="empty" title="No ticket found" description="There is no ticket found" />
                                    ) : (
                                        ticket.map((ticket, index) => (
                                            <ListTicket
                                                key={index}
                                                name="Regular Ticket"
                                                price={ticket.currentprice}
                                                quantity={amount}
                                                onDecrement={() => {
                                                    if (amount < 2) {
                                                        setActiveIndex(null);
                                                        setDisable(false);
                                                    }
                                                    handleDecrement(ticket.id);
                                                }}
                                                onIncrement={() => {
                                                    setDisable(true);
                                                    handleIncrement(ticket.id);
                                                }}
                                                selected={active === index}
                                                disable={disable}
                                                onSelect={() => {
                                                    setActiveIndex(index);
                                                    handlechange(index);
                                                }}
                                            />
                                        ))
                                    )}

                                    <Grid container sx={{ marginTop: 6 }}>
                                        <Grid item xs={12}>
                                            <AnimateButton>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-around',
                                                        borderRadius: 2,
                                                        padding: 1.6
                                                    }}
                                                    disabled={amount === 0}
                                                    onClick={() => setActivePanel('checkout')}
                                                >
                                                    <Typography variant="subtitle1" fontWeight={800}>
                                                        {parseFloat(price * amount).toFixed(2)} ETB{' '}
                                                    </Typography>
                                                    <Divider orientation="vertical" />
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-between'
                                                        }}
                                                    >
                                                        <Typography variant="h4" marginRight={1}>
                                                            Checkout
                                                        </Typography>
                                                    </Box>
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                        <AgreementLinks />
                                    </Grid>
                                </Grid>
                            ) : agent === 'mpesa' ? (
                                <WithMPesa selectedTicket={selectedTicket} amount={amount} price={price} paymentloader={paymentloader} />
                            ) : (
                                <Grid item xs={12} sx={{ position: 'relative' }}>
                                    <Typography variant="subtitle1" sx={{ marginY: 1.4 }}>
                                        Personal Information
                                    </Typography>
                                    <PersonalInfo handleSubmission={handlePayment}>
                                        <Grid container marginTop={2}>
                                            {PaymentGateways.map((agent, index) => (
                                                <Gateways
                                                    key={index}
                                                    name={agent.name}
                                                    logo={agent.logo}
                                                    onPress={() => ChooseGateway(agent)}
                                                    isChecked={selection === agent.name}
                                                />
                                            ))}
                                        </Grid>
                                        <Grid
                                            container
                                            sx={{
                                                marginTop: 6,
                                                border: 0.5,
                                                borderColor: theme.palette.primary.light,
                                                padding: 1.4,
                                                borderRadius: 2
                                            }}
                                        >
                                            <Grid
                                                item
                                                xs={12}
                                                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                                            >
                                                <Typography variant="subtitle2">Ticket Type</Typography>
                                                <Typography variant="subtitle1">{selectedTicket?.tickettype} </Typography>
                                            </Grid>
                                            <Divider />

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginTop: 1.6
                                                }}
                                            >
                                                <Typography variant="subtitle2">Quantity</Typography>
                                                <Typography variant="subtitle1">{amount} </Typography>
                                            </Grid>
                                            <Divider />

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginTop: 1.6
                                                }}
                                            >
                                                <Typography variant="subtitle2">Each Price</Typography>
                                                <Typography variant="subtitle1">{price} </Typography>
                                            </Grid>
                                            <Divider />

                                            <Grid
                                                item
                                                xs={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-between',
                                                    marginTop: 1.6
                                                }}
                                            >
                                                <Typography variant="subtitle1"> Total</Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <Typography variant="subtitle1">
                                                        {' '}
                                                        {parseFloat(price * amount).toFixed(2)} ETB{' '}
                                                    </Typography>
                                                </Box>
                                            </Grid>

                                            <Grid item xs={12} marginTop={4}>
                                                <AnimateButton>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        type="submit"
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'space-around',
                                                            borderRadius: 2,
                                                            padding: 1.4
                                                        }}
                                                        disabled={amount === 0}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between'
                                                            }}
                                                        >
                                                            <Typography variant="subtitle1" marginRight={1}>
                                                                {paymentloader ? (
                                                                    <CircularProgress
                                                                        size={20}
                                                                        sx={{ color: theme.palette.background.default }}
                                                                    />
                                                                ) : gateway ? (
                                                                    'Pay with ' + gateway
                                                                ) : (
                                                                    'Pay'
                                                                )}
                                                            </Typography>
                                                        </Box>
                                                    </Button>
                                                </AnimateButton>
                                            </Grid>
                                        </Grid>
                                    </PersonalInfo>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Dialog>
            <SnackbarProvider maxSnack={3} />
        </Fragment>
    );
}

BuyTicket.propTypes = {
    id: PropTypes.number,
    open: PropTypes.bool,
    event: PropTypes.any,
    handleClose: PropTypes.func,
    onAdded: PropTypes.func
};

export default BuyTicket;
