import { Box, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/system';
import Connections from 'api';
import React from 'react';
import OrganizerMiniSkeleton from 'ui-component/skeleton/organizermini';

const OrgMinicard = ({ isLoading, profile, name, category }) => {
    const theme = useTheme();
    return (
        <>
            {isLoading ? (
                <OrganizerMiniSkeleton />
            ) : (
                <Box
                    marginY={2}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        background: theme.palette.background.default,
                        borderRadius: 3,
                        width: '100%',
                        '& > *': {
                            margin: theme.spacing(2)
                        }
                    }}
                >
                    <Avatar alt="Profile" src={Connections.api + Connections.assets + profile} sx={{ width: 50, height: 50 }} />
                    <div>
                        <Typography variant="h4">{name}</Typography>
                        <Typography variant="subtitle2">{category}</Typography>
                    </div>
                </Box>
            )}
        </>
    );
};

export default OrgMinicard;
