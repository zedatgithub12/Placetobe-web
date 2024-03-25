import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Button, Divider, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconUser, IconAddressBook, IconArrowLeft, IconAt, IconCalendar, IconCategory, IconPhone } from '@tabler/icons';
import { useNavigate } from 'react-router';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import Compone from './components/compone';
import Comptwo from './components/comptwo';
import Connections from 'api';
import DeleteAccount from './components/AccountDeletion';

const Profile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const customization = useSelector((state) => state.customization);
    const [open, setOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    //after the deletion is confirmed by user delete the account from the database
    const handleAccountDeleting = () => {
        setIsDeleting(true);
        const Api = Connections.api + Connections.deleteAccount + user.id;
        const headers = {
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        fetch(Api, {
            method: 'DELETE',
            headers: headers
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setIsDeleting(false);
                    handlePrompts(response.message, 'success');
                    handleClose();
                    localStorage.clear();
                    sessionStorage.clear();
                    location.reload();
                } else {
                    setIsDeleting(false);
                    handlePrompts(response.message, 'error');
                }
            })
            .catch((error) => {
                setIsDeleting(false);
                handlePrompts(error.message, 'error');
            });
    };

    const handlePrompts = (messages, severity) => {
        enqueueSnackbar(messages, { variant: severity });
    };

    const handleNavigation = () => {
        navigate('/signin');
    };

    useEffect(() => {
        const token = customization.rememberme ? localStorage.getItem('token') : sessionStorage.getItem('token');
        const user = customization.rememberme ? localStorage.getItem('user') : sessionStorage.getItem('user');

        if (!token && !user) {
            handleNavigation();
        }
        return () => {};
    }, [customization.rememberme]);

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

                        <Grid container>
                            <Grid
                                item
                                xs={12}
                                sx={{
                                    marginTop: 1,
                                    padding: 1
                                }}
                            >
                                <Button variant="text" color="error" onClick={() => handleClickOpen()}>
                                    Delete account
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <DeleteAccount open={open} handleClose={handleClose} onDelete={handleAccountDeleting} isDeleting={isDeleting} />
            <SnackbarProvider maxSnack={3} />
        </Grid>
    );
};

export default Profile;
