import { Typography, Grid, Card, Stack } from '@mui/material';
import bookmark from '../../../assets/images/profile/bookmark.svg';
import EventIcon from '@mui/icons-material/Event';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import BookMarkData from '../../../data/bookmark';
import '../../../App.css';
const Events = () => {
    return (
        <Grid container className="bookmarkContainer" spacing={{ xs: 2, sm: 6, md: 6, lg: 4 }}>
            {BookMarkData.map((item) => {
                return (
                    <Grid key={item.id} item xs={12} sm={6} md={4} lg={3}>
                        <Card>
                            <img style={{ border: 'none', width: '100%' }} alt="profile" src={bookmark} />
                            <div style={{ padding: '0.3rem' }}>
                                <Typography variant="h4" style={{ padding: '0.3rem 0' }}>
                                    {item.title}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <EventIcon sx={{ fontSize: '1.3rem', textAlign: 'center' }} />
                                    <Typography variant="subtitle">{item.date}</Typography>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <FmdGoodOutlinedIcon sx={{ fontSize: '1.3rem', textAlign: 'center' }} />
                                    <Typography variant="subtitle">{item.location}</Typography> <br />
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <ConfirmationNumberOutlinedIcon sx={{ fontSize: '1.3rem', textAlign: 'center' }} />
                                    <Typography variant="subtitle"> {item.price}</Typography> <br />
                                </Stack>
                                <button style={{ background: '#ffbb00', border: 'none', borderRadius: '5px', margin: '0.3rem 0' }}>
                                    Remove
                                </button>
                            </div>
                        </Card>
                    </Grid>
                );
            })}
        </Grid>
    );
};
export default Events;
