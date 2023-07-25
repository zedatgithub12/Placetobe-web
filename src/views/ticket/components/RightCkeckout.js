import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TimerIcon from '@mui/icons-material/Timer';
import Lottie from 'react-lottie';

const RightCheckout = () => {
    const [paymentMethod, setPaymentMethod] = useState('chapa');
    const [timer, setTimer] = useState('12:00');
    useEffect(() => {
        const targetTime = new Date();
        targetTime.setMinutes(targetTime.getMinutes() + 12);

        const timerInterval = setInterval(() => {
            const currentTime = new Date();
            const timeDifference = targetTime - currentTime;
            if (timeDifference <= 0) {
                clearInterval(timerInterval);
                setTimer('00:00');
            } else {
                const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
                const seconds = Math.floor((timeDifference / 1000) % 60);
                setTimer(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            }
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
    };

    return (
        <Box height={'100%'}>
            <Box display={'flex'} height={'100%'} px={2} pt={0} pb={1} justifyContent={'space-between'} flexDirection={'column'}>
                <Box display={'flex'} justifyContent={'center'}>
                    <TimerIcon color="gray" fontSize="medium" style={{ marginRight: '8px' }} />
                    <Typography variant="h3" gutterBottom>
                        {timer}
                    </Typography>
                </Box>

                {timer === '00:00' ? (
                    <>
                        <Lottie
                            options={{
                                loop: true,
                                autoplay: true,
                                animationData: require('../../../assets/lottie/timeout.json'),
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            }}
                            height={200}
                            width={200}
                        />
                        <Box
                            fullWidth
                            alignContent={'center'}
                            display={'flex'}
                            justifyContent={'center'}
                            justifyItems={'center'}
                            flexDirection={'column'}
                            alignItems={'center'}
                        >
                            <Typography variant="h5" gutterBottom>
                                Time Elapsed
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Go back and re-checkout
                            </Typography>
                        </Box>
                        <Button style={{ backgroundColor: '#FFBB00', color: '#000' }} color="warning" variant="contained">
                            <Typography variant="h5" gutterBottom>
                                Go Back
                            </Typography>
                        </Button>
                    </>
                ) : (
                    <>
                        <Box>
                            <Box display="flex" alignItems="center" mb={2}>
                                <TextField
                                    label="Full Name"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircleIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                            <Box display="flex" alignItems="center" mb={1}>
                                <TextField
                                    label="Phone Number"
                                    variant="outlined"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PhoneIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Box>
                        <Box>
                            <Box mb={1}>
                                <Typography variant="h5" gutterBottom>
                                    Payment Method
                                </Typography>
                            </Box>
                            <Box display="flex" px={2} alignItems="center">
                                <FormControlLabel
                                    value="chapa"
                                    control={
                                        <Radio
                                            checked={paymentMethod === 'chapa'}
                                            onChange={handlePaymentMethodChange}
                                            style={{ display: 'none' }}
                                            value={'chapa'}
                                        />
                                    }
                                    label={
                                        <Paper
                                            elevation={paymentMethod === 'chapa' ? 6 : 1}
                                            style={{
                                                width: 100,
                                                height: 60,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                background: '#fff',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <img
                                                src="https://banksethiopia.com/wp-content/uploads/chapa-1-320x121.png"
                                                alt="chapa"
                                                style={{
                                                    width: 90,
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                    opacity: paymentMethod === 'chapa' ? 1 : 0.5
                                                }}
                                            />
                                        </Paper>
                                    }
                                />
                                <FormControlLabel
                                    value="paypal"
                                    control={
                                        <Radio
                                            checked={paymentMethod === 'telebirr'}
                                            onChange={handlePaymentMethodChange}
                                            style={{ display: 'none' }}
                                            value={'telebirr'}
                                        />
                                    }
                                    label={
                                        <Paper
                                            elevation={paymentMethod === 'telebirr' ? 3 : 1}
                                            style={{
                                                width: 100,
                                                height: 60,
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                cursor: 'pointer',
                                                background: '#fff',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            <img
                                                src="https://www.ethiotelecom.et/wp-content/uploads/2021/04/TeleBirr-Logo.svg"
                                                alt="telebirr"
                                                style={{
                                                    width: 90,
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                    opacity: paymentMethod === 'telebirr' ? 1 : 0.5
                                                }}
                                            />
                                        </Paper>
                                    }
                                />
                            </Box>
                        </Box>
                        <Button style={{ backgroundColor: '#FFBB00', color: '#000' }} color="warning" fullWidth variant="contained">
                            <Box fullWidth p={0.5}>
                                <Typography variant="h4">600 ETB Pay</Typography>
                            </Box>
                        </Button>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default RightCheckout;
