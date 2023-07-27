// material-ui
import { Grid, Box, IconButton, Typography, CardHeader, TextField, Button, Link, Divider } from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import { Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material';

// ==============================|| REQUEST REFUNDING PAGE ||============================== //

const RefundingRequest = ({ onClose, ticket }) => {
    const theme = useTheme();
    const [refundingReason, setRefundingReason] = useState('');

    const handleSendButtonClick = () => {
        const inputRef = document.getElementById('refunding-reason');
        if (inputRef) {
            setRefundingReason(inputRef.value);
        }
    };
    return (
        <Card variant="outlined" sx={{ minWidth: 480 }}>
            <CardHeader
                sx={{
                    padding: '6px 24px'
                }}
                titleTypographyProps={{ fontSize: theme.typography.h1 }}
                title={'Ticket Info'}
                action={
                    <IconButton aria-label="close" onClick={onClose}>
                        <ClearRounded />
                    </IconButton>
                }
            ></CardHeader>
            <Divider />
            <CardContent sx={{ padding: '12px 24px', paddingBottom: '0px !important' }}>
                <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                    <Typography>Event Name</Typography>
                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.event_name}</Typography>
                </Grid>
                <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 1.5 }}>
                    <Typography>Ticket Type</Typography>
                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.tickettype}</Typography>
                </Grid>
                <Grid display={'flex'} justifyContent={'space-between'} sx={{ mb: 2.5 }}>
                    <Typography>Total</Typography>
                    <Typography fontWeight={theme.typography.fontWeightBold}>{ticket.price + ' ETB'}</Typography>
                </Grid>
                <Grid sx={{ mb: 1.5 }}>
                    <Typography fontSize={theme.typography.h4} fontWeight={theme.typography.fontWeightBold} sx={{ mb: 1.5 }}>
                        Refunding Reason
                    </Typography>
                    <Divider sx={{ margin: '10px 0px' }} />
                    <TextField
                        variant="filled"
                        id="refunding-reason"
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
                    <Box
                        variant="contained"
                        fullWidth
                        sx={{
                            p: 2,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '5px',
                            backgroundColor: theme.palette.warning.dark,
                            color: 'black',
                            '&:hover': { backgroundColor: theme.palette.warning.main }
                        }}
                        onClick={handleSendButtonClick}
                    >
                        <Typography variant="h4">Submit</Typography>
                    </Box>
                </Grid>
                <Grid>
                    <Typography display={'flex'} justifyContent={'center'} fontSize={theme.typography.subtitle1}>
                        <Link>Refunding Terms </Link> | Terms of Agreement
                        {/* link here should be linked to the corresponding page */}
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RefundingRequest;
