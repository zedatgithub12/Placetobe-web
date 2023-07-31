import { Typography, Grid, Stack } from '@mui/material';
import profilePicture from '../../../assets/images/profile/profilePicture.svg';
import FollowersData from '../../../data/followers';
const Following = () => {
    return (
        <>
            <Grid container pl={{ xs: 1, sm: 5 }} pt={{ xs: 3, sm: 4 }} pb={10} spacing={{ xs: 4, sm: 3 }}>
                {FollowersData.map((item) => {
                    return (
                        <Grid key={item.id} item xs={12} sm={6}>
                            <Stack direction="row">
                                <img style={{ width: '60px', height: '60px', border: 'none' }} alt="profile" src={profilePicture} />
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
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};
export default Following;
