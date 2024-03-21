import { Box, Button, Divider, Grid, Typography, useTheme } from '@mui/material';
import { alert, call } from 'hylid-bridge';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Gateways from './Gateways';
import PropTypes from 'prop-types';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import { CheckCircle } from '@mui/icons-material';

const WithMPesa = ({ selectedTicket, amount, price, paymentloader }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [payed, setPayed] = useState(false);

    const makePayWithMPESA = () => {
        try {
            let totalAmount = parseFloat(price * amount).toFixed(2);
            call('payWithMpesa', {
                businessID: '1313',
                billReference: selectedTicket?.id,
                amount: totalAmount,
                currency: 'ETB',
                reason: `${selectedTicket?.event_name}+ ${selectedTicket?.tickettype} Ticket purchase`,

                success: function (res) {
                    setPayed(true);
                    alert({
                        content: JSON.stringify(res)
                    });
                },
                fail: function () {
                    handlePrompts('Error completing the payment', 'error');
                }
            });
        } catch (error) {
            handlePrompts(error.message, 'error');
        }
    };

    const handlePrompts = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };
    return (
        <>
            {payed ? (
                <Grid
                    item
                    xs={12}
                    sx={{
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CheckCircle fontSize="large" style={{ fontSize: 46, color: theme.palette.success.dark }} />
                    <Typography variant="subtitle1" marginY={2}>
                        Successfully payed!
                    </Typography>
                    <Button variant="text" color="secondary" onClick={() => navigate('/')} sx={{}}>
                        Done
                    </Button>
                </Grid>
            ) : (
                <Grid item xs={12} sx={{ position: 'relative' }}>
                    <Grid container marginTop={8} justifyContent="center">
                        <Gateways name="M-PESA" logo={require('assets/images/logo/mpesa.jpg')} isChecked={true} />
                    </Grid>
                    <Grid
                        container
                        sx={{
                            marginTop: 8,
                            border: 0.5,
                            borderColor: theme.palette.primary.light,
                            padding: 1.4,
                            borderRadius: 2
                        }}
                    >
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                            <Typography variant="subtitle1">{price} ETB </Typography>
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
                                <Typography variant="subtitle1"> {parseFloat(price * amount).toFixed(2)} ETB </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12} marginTop={4}>
                            <AnimateButton>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={() => makePayWithMPESA()}
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
                                                <CircularProgress size={20} sx={{ color: theme.palette.background.default }} />
                                            ) : (
                                                'Pay with M-PESA'
                                            )}
                                        </Typography>
                                    </Box>
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </Grid>
            )}
            <SnackbarProvider maxSnack={3} />
        </>
    );
};

WithMPesa.propTypes = {
    selectedTicket: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    amount: PropTypes.number,
    price: PropTypes.number,
    paymentloader: PropTypes.bool
};
export default WithMPesa;
