import { useState } from 'react';
import { Grid, Box, useTheme, CircularProgress } from '@mui/material';
import { IconCamera, IconCheck, IconInfoCircle, IconUser } from '@tabler/icons';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import Connections from 'api';

const ProfilePic = () => {
    const theme = useTheme();
    const user = JSON.parse(localStorage.getItem('user'));
    const { rememberme } = useSelector((state) => state.customization);

    const [picturePreview, setPicturePreview] = useState(user?.profile ? Connections.api + Connections.assets + user?.profile : null);
    const [updatingProfile, setupdatingProfile] = useState('camera');

    const handleSessions = (user) => {
        rememberme ? localStorage.setItem('user', JSON.stringify(user)) : sessionStorage.setItem('user', JSON.stringify(user));
    };

    const handlePictureChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPicturePreview(reader.result);

                setupdatingProfile('loading');
                const Api = Connections.api + Connections.webprofile + user?.id;

                const formData = new FormData();
                formData.append('profile', file);

                fetch(Api, {
                    method: 'POST',
                    body: formData
                })
                    .then((response) => response.json())
                    .then((response) => {
                        if (response.success) {
                            setupdatingProfile('done');
                            handleSessions(response.data);
                            handlePrompts(response.message, 'success');
                        } else {
                            setupdatingProfile('camera');
                            handlePrompts(response.message, 'error');
                        }
                    })
                    .catch((error) => {
                        setupdatingProfile('camera');
                        handlePrompts(error.message, 'error');
                    });
            };
        }
    };

    const handlePrompts = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };

    return (
        <Grid container spacing={1} justifyContent="center">
            <input type="file" accept="image/*" onChange={handlePictureChange} style={{ display: 'none' }} id="profile-picture" />
            <label htmlFor="profile-picture">
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 90,
                        height: 90,
                        border: 3,
                        borderStyle: 'solid',
                        borderRadius: 45,
                        borderColor: theme.palette.primary.light,
                        backgroundColor: theme.palette.background.default,
                        cursor: 'pointer',
                        boxShadow: 2
                    }}
                >
                    {picturePreview ? (
                        <img
                            src={picturePreview}
                            alt="profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                backgroundColor: theme.palette.background.default,
                                aspectRatio: 1,
                                objectFit: 'cover'
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <IconUser size={36} />
                        </Box>
                    )}

                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 6,
                            right: -6,
                            width: 28,
                            height: 28,
                            borderRadius: 12,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: theme.palette.background.default,
                            boxShadow: 1
                        }}
                    >
                        {updatingProfile === 'camera' ? (
                            <IconCamera size={20} style={{ color: theme.palette.grey[400] }} />
                        ) : updatingProfile === 'loading' ? (
                            <CircularProgress size={18} />
                        ) : updatingProfile === 'done' ? (
                            <IconCheck size={18} style={{ color: theme.palette.success.dark }} />
                        ) : (
                            <IconInfoCircle size={18} style={{ color: theme.palette.info.main }} />
                        )}
                    </Box>
                </div>
            </label>

            <SnackbarProvider maxSnack={3} />
        </Grid>
    );
};

export default ProfilePic;
