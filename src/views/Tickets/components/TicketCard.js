import * as React from 'react';
import { Card, CardContent, Typography, CardActionArea, Grid, Box, useTheme } from '@mui/material';
import { TicketName } from 'data/TicketIcon';
import { DateFormatter } from 'utils/function';

function TicketCard({ onPress, event, type, quantity, iconName, iconColor, price, date, status, textColor }) {
    const theme = useTheme();
    return (
        <Grid
            item
            xs={12}
            sm={5.9}
            md={3.8}
            lg={3.8}
            sx={{
                marginLeft: 1,
                marginBottom: 1,
                border: 0.5,
                borderColor: theme.palette.grey[200],
                borderRadius: 3
            }}
            onClick={onPress}
        >
            <Card>
                <CardActionArea>
                    <Box sx={{ height: 140, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <TicketName iconname={iconName} sx={{ color: iconColor }} />
                    </Box>

                    <CardContent>
                        <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                            {type} ticket
                        </Typography>
                        <Typography gutterBottom variant="h3" sx={{ marginY: 0.8 }}>
                            {event}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize', marginY: 1.2 }}>
                            {quantity} * {price} ETB
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {DateFormatter(date)}
                        </Typography>

                        <Box
                            sx={{
                                display: 'inline-block',
                                marginTop: 2,
                                padding: 0.5,
                                paddingX: 3,
                                borderRadius: 10,
                                backgroundColor: textColor
                            }}
                        >
                            <Typography sx={{ textTransform: 'capitalize' }}>{status}</Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}

export default TicketCard;
