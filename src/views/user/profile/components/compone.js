import { Button, Grid, Typography, useTheme } from '@mui/material';
import { IconEdit } from '@tabler/icons';
import Connections from 'api';
import Avatar from 'assets/images/avatar.webp';
import PropTypes from 'prop-types';
import ProfilePic from './ProfilePic';

//A component created for a profile page it contains, profile picture, name, email and followers
const Compone = ({ picture, name, email, followers, onEdit }) => {
    const theme = useTheme();
    return (
        <Grid container alignItems="center" justifyContent="center">
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    backgroundColor: theme.palette.secondary.main,
                    minHeight: 110,
                    borderRadius: 2,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    padding: 0.5
                }}
            >
                <Button variant="text" sx={{ color: theme.palette.background.default }} onClick={onEdit}>
                    <IconEdit size={14} style={{ marginRight: 3 }} /> Edit
                </Button>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: -6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ProfilePic profile={picture ? Connections.api + Connections.assets + picture : Avatar} />
            </Grid>
            <Grid
                item
                xs={12}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 1 }}
            >
                {name && <Typography variant="h4">{name}</Typography>}
                {email && (
                    <Typography variant="subtitle2" marginTop={0.4}>
                        {email}
                    </Typography>
                )}
            </Grid>
            {followers && (
                <Typography variant="subtitle1" marginY={1.2}>
                    {followers} Followers
                </Typography>
            )}
        </Grid>
    );
};

Compone.propTypes = {
    picture: PropTypes.any,
    name: PropTypes.string,
    email: PropTypes.string,
    followers: PropTypes.number,
    onEdit: PropTypes.func
};
export default Compone;
