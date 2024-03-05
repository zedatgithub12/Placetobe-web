import { Box, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { IconArrowLeft } from '@tabler/icons';
import { useNavigate } from 'react-router';
import EditForm from './components/editForm';

const EditProfile = () => {
    const theme = useTheme();
    const navigate = useNavigate();
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
            <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
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
                    <IconButton onClick={() => navigate(-1)}>
                        <IconArrowLeft size={20} />
                    </IconButton>
                    <Typography>Edit profile</Typography>
                </Box>

                <EditForm />
            </Grid>
        </Grid>
    );
};

export default EditProfile;
