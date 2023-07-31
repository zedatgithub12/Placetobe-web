import { Typography, Grid, Stack } from '@mui/material';
import profilePicture from '../../../assets/images/profile/profilePicture.svg';
import FollowingData from '../../../data/following';
import StarIcon from '@mui/icons-material/Star';
const Following = () => {
    return (
        <>
            <Grid container pl={{ xs: 1, sm: 5 }} pt={{ xs: 3, sm: 4 }} pb={10} spacing={{ xs: 4, sm: 3 }}>
                {FollowingData.map((item) => {
                    return (
                        <Grid key={item.id} item xs={12} sm={6}>
                            <Stack direction="row">
                                <img style={{ width: '60px', height: '60px', border: 'none' }} alt="profile" src={profilePicture} />
                                <div
                                    style={{
                                        paddingLeft: '1rem',

                                        textAlign: 'left',
                                        border: 'none',
                                        background: 'white'
                                    }}
                                >
                                    <Typography variant="h5">{item.company_name}</Typography>
                                    <Typography variant="caption">{item.category}</Typography>
                                    <Typography variant="h5">
                                        {item.rating}{' '}
                                        <sup>
                                            <StarIcon sx={{ fontSize: '0.5rem', color: '#ffbb00' }} />
                                        </sup>
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
export default Following;
