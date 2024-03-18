import { Box, Button, Divider, Grid, Typography, useTheme } from '@mui/material';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Gateways from './Gateways';
import PropTypes from 'prop-types';
import { call, getSystemInfo } from 'hylid-bridge';

const WithMPesa = ({ selectedTicket, amount, price, paymentloader }) => {
    const theme = useTheme();

    const makePayWithMPESA = () => {
        try {
            let totalAmount = parseFloat(price * amount).toFixed(2);

            // call(
            //     'payWithMpesa',
            //     {
            //         businessID: '',
            //         billReference: '243',
            //         amount: totalAmount,
            //         currency: 'ETB',
            //         reason: `${selectedTicket?.event_name}+ ${selectedTicket?.tickettype} Ticket purchase`
            //     },
            //     (res) => {
            //         console.log('success', res);
            //     },
            //     (res) => {
            //         console.log('error', res);
            //     }
            // );
        } catch (error) {
            console.log(error);
        }
    };
    return (
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
    );
};

PropTypes.WithMPesa = {
    selectedTicket: PropTypes.oneOf([PropTypes.object, PropTypes.array]),
    amount: PropTypes.number,
    price: PropTypes.number
};
export default WithMPesa;
