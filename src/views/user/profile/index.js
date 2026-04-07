import { Box, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconUser, IconAddressBook, IconArrowLeft, IconAt, IconCalendar, IconCategory, IconPhone } from '@tabler/icons';
import { useNavigate } from 'react-router';
import Compone from './components/compone';
import Comptwo from './components/comptwo';

const Profile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const MoreInfo = user && [
        {
            icon: <IconAt size={16} />,
            name: user?.username,
            label: 'Username'
        },
        {
            icon: <IconUser size={16} />,
            name: user?.gender,
            label: 'Gender'
        },
        {
            icon: <IconCalendar size={16} />,
            name: user?.birthdate,
            label: 'Birthdate'
        },
        {
            icon: <IconAddressBook size={16} />,
            name: user?.living_address,
            label: 'Address'
        },
        {
            icon: <IconCategory size={16} />,
            name: user?.category,
            label: 'Category'
        },
        {
            icon: <IconPhone size={18} />,
            name: user?.phone,
            label: 'Phone'
        }
    ];
    return (
        <Grid
            container
            sx={{
                backgroundColor: theme.palette.primary.light,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                padding: 2,
                minHeight: '100dvh'
            }}
        >
            <Grid item xs={12} sm={8} md={8} lg={6} xl={6}>
                <Box
                    sx={{
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 2,
                        padding: 1,
                        display: 'flex',
                        alignItems: 'center',
                        marginY: 1.2
                    }}
                >
                    <IconButton onClick={() => navigate('/')}>
                        <IconArrowLeft size={20} />
                    </IconButton>
                    <Typography variant="h4">Profile</Typography>
                </Box>
                <Grid container sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Grid
                        item
                        xs={12}
                        md={6}
                        lg={6}
                        xl={6}
                        sx={{
                            marginTop: 1,
                            backgroundColor: theme.palette.background.default,
                            borderRadius: 2,
                            border: 0.5,
                            borderColor: theme.palette.grey[300]
                        }}
                    >
                        <Compone
                            picture={user?.profile}
                            name={`${user?.first_name} ${user?.middle_name} `}
                            email={user?.email}
                            onEdit={() => navigate('/user/profile/edit')}
                        />
                    </Grid>
                    <Grid item xs={12} md={5.5} lg={5.5} xl={5.5}>
                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    marginTop: 1,
                                    padding: 1,
                                    borderRadius: 2,
                                    border: 0.5,
                                    borderColor: theme.palette.grey[300],
                                    backgroundColor: theme.palette.background.default
                                }}
                            >
                                <Typography variant="subtitle1" marginY={0.5}>
                                    More Details
                                </Typography>
                                <Divider />
                                {MoreInfo?.map(
                                    (info, index) =>
                                        info.name && <Comptwo key={index} icon={info.icon} name={info.name} label={info.label} />
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Profile;
