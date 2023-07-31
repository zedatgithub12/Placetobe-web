import { Typography, Grid, Stack, Divider } from '@mui/material';
import profilePicture from '../../../assets/images/profile/profilePicture.svg';
import ratingData from '../../../data/rating';
import StarIcon from '@mui/icons-material/Star';
const Rating = () => {
    return (
        <>
            <Grid container pl={{ xs: 1, sm: 5 }} pt={{ xs: 3, sm: 4 }} pb={10} spacing={{ xs: 4, sm: 3 }}>
                {ratingData.map((item) => {
                    return (
                        <Grid key={item.id} item xs={12} sm={6} pr={5}>
                            <Stack
                                divider={<Divider orientation="horizontal" />}
                                style={{ border: '1px solid #D9D9D9', borderRadius: '8px' }}
                            >
                                <Stack direction="row" style={{ paddingLeft: '1rem' }}>
                                    <img style={{ width: '50px', height: '50px', border: 'none' }} alt="profile" src={profilePicture} />
                                    <div
                                        style={{
                                            paddingLeft: '1rem',
                                            paddingTop: '0.3rem',
                                            textAlign: 'left',
                                            border: 'none',
                                            background: 'white'
                                        }}
                                    >
                                        <Typography variant="h5">{item.username}</Typography>
                                        <Typography variant="caption">{item.email}</Typography>
                                    </div>
                                </Stack>
                                <Stack style={{ padding: '1.5rem 0 0 1.5rem' }}>
                                    <Typography style={{ color: '#6C6C6C' }}>{item.description}</Typography>
                                    <Typography variant="h4" style={{ textAlign: 'right', padding: '2rem 1rem 0.5rem', color: 'silver' }}>
                                        {item.rating}
                                        <sup>
                                            <StarIcon sx={{ fontSize: '0.8rem', marginRight: '-0.7rem' }} />
                                        </sup>
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
export default Rating;
