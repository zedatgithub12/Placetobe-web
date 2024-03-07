import { useState, Fragment, useEffect } from 'react';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import {
    Box,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import Connections from 'api';
import PropTypes from 'prop-types';
import ListTicket from './ListTicket';
import { addTicket } from 'store/slice/Tickets';
import { useDispatch, useSelector } from 'react-redux';
import AnimateButton from 'ui-component/extended/AnimateButton';
import AgreementLinks from 'ui-component/Agreements';
import { MiniHeader } from 'ui-component/page-header/miniHeader';
import { IconArrowLeft, IconX } from '@tabler/icons';
import PersonalInfo from './PersonalInfo';
import { PaymentGateways } from 'data/PaymentGateways';
import Gateways from './Gateways';

function BuyTicket({ open, event, id, handleClose, onAdded }) {
    const [loading, setLoading] = useState(true);
    const [amount, setAmount] = useState(0);
    const [ticket, setTickets] = useState([]);
    const [active, setActiveIndex] = useState();
    const [selectedTicket, setSelectedTicket] = useState();
    const [price, setPrice] = useState(0);
    const [disable, setDisable] = useState(false);

    const theme = useTheme();
    const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
    const bidDevice = useMediaQuery(theme.breakpoints.up('sm'));

    const [activePanel, setActivePanel] = useState('buy');
    const [selection, setSelection] = useState(null);
    const [gateway, setGateway] = useState();

    const dispatch = useDispatch();
    const { tickets } = useSelector((state) => state.ticket);

    const handlechange = (index) => {
        const newItem = tickets[index];
        const newUpdate = { ...newItem, open: false };
        dispatch(addTicket(newUpdate));
    };

    /****************************************************** */
    //featch Tickets
    /***************************************************** */
    const FetchTicket = () => {
        const controller = new AbortController();
        const signal = controller.signal;

        var ApiUrl = Connections.api + Connections.eventTicket + id;
        var headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(ApiUrl, {
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
                console.log(error);
            });

        return () => {
            controller.Abort();
        };
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
        var isSubcribed = true;
        if (isSubcribed) {
            FetchTicket();
            dispatch(addTicket(ticket));
        }
        return () => {
            isSubcribed = false;
        };
    }, []);

    const ChooseGateway = (gateway) => {
        if (selection === gateway.name) {
            setSelection(null);
            setGateway(null);
        } else {
            setSelection(gateway.name);
            setGateway(gateway.name);
        }
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={handleClose} sx={{ padding: 2 }} fullWidth>
                <DialogContent>
                    {smallDevice && activePanel === 'checkout' ? (
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
                        {smallDevice && activePanel === 'buy' ? (
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ position: 'relative' }}>
                                <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                                    Available Tickets
                                </Typography>

                                {ticket.map((ticket, index) => (
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
                                ))}

                                <Grid container sx={{ position: 'absolute', bottom: 1 }}>
                                    <Grid item xs={12}>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-around',
                                                    borderRadius: 10,
                                                    padding: 1.4
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
                        ) : smallDevice && activePanel === 'checkout' ? (
                            <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ position: 'relative' }}>
                                <Typography variant="subtitle1">Personal Information</Typography>
                                <PersonalInfo />
                                <Grid container>
                                    <Grid item xs={12}>
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
                                </Grid>
                                <Grid
                                    container
                                    sx={{
                                        position: 'absolute',
                                        bottom: 0,
                                        border: 0.5,
                                        borderColor: theme.palette.primary.light,
                                        padding: 1.4,
                                        borderRadius: 2
                                    }}
                                >
                                    {/* <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                                    <Divider /> */}

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
                                            <Typography variant="subtitle1"> {parseFloat(price * amount).toFixed(2)} ETB </Typography>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={12} marginTop={2}>
                                        <AnimateButton>
                                            <Button
                                                variant="contained"
                                                fullWidth
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
                                                        Pay with
                                                    </Typography>
                                                </Box>
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ) : (
                            <>
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ position: 'relative' }}>
                                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                                        Available Tickets
                                    </Typography>

                                    {ticket.map((ticket, index) => (
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
                                    ))}

                                    <Grid container sx={{ position: 'absolute', bottom: 10 }}>
                                        <Grid item xs={12}>
                                            <AgreementLinks />
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6} sx={{ paddingX: 2, position: 'relative' }}>
                                    <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                                        Personal Information
                                    </Typography>

                                    <PersonalInfo />
                                    <Grid container>
                                        <Grid item xs={12}>
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
                                    </Grid>

                                    <Grid
                                        container
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            border: 0.5,
                                            borderColor: theme.palette.primary.light,
                                            padding: 1.4,
                                            borderRadius: 2
                                        }}
                                    >
                                        {/* <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                                        <Divider /> */}

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
                                                <Typography variant="subtitle1"> {parseFloat(price * amount).toFixed(2)} ETB </Typography>
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12} marginTop={2}>
                                            <AnimateButton>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
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
                                                            Pay
                                                        </Typography>
                                                    </Box>
                                                </Button>
                                            </AnimateButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </>
                        )}
                    </Grid>
                </DialogContent>
            </Dialog>
            <SnackbarProvider maxSnack={3} />
        </Fragment>
    );
}

BuyTicket.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    onAdded: PropTypes.func
};

export default BuyTicket;
