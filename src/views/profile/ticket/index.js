import { Typography, Grid, Card, Stack } from '@mui/material';
import bookmark from '../../../assets/images/profile/bookmark.svg';
import TicketData from '../../../data/ticket';

const Ticket = () => {
    return (
        <Grid container style={{ padding: '0rem 1rem 8rem' }} spacing={{ xs: 2, sm: 6, md: 6, lg: 4 }}>
            {TicketData.map((item) => {
                return (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <Typography
                                variant="body2"
                                style={{
                                    padding: '0rem 0 0.3rem 0.3rem',
                                    textAlign: 'right',
                                    color: item.deadline == 'Upcoming' ? 'green' : item.deadline == 'Expired' ? 'red' : 'silver'
                                }}
                            >
                                <span style={{ fontSize: '5rem' }}>.</span> {item.deadline}
                            </Typography>
                            <img style={{ border: 'none', width: '100%' }} alt="profile" src={bookmark} />
                            <div style={{ padding: '0.3rem' }}>
                                <Typography variant="h4" style={{ padding: '0.3rem 0' }}>
                                    {item.title}
                                </Typography>
                                <Typography>{item.ticketName}</Typography>
                            </div>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};
export default Ticket;
