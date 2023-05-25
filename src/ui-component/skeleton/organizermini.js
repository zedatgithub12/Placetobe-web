import React from 'react';
import { Stack, Skeleton, Box } from '@mui/material';
import { useTheme } from '@mui/system';

const OrganizerMiniSkeleton = () => {
    const theme = useTheme();
    return (
        <Box
            marginY={2}
            sx={{
                display: 'flex',
                alignItems: 'center',
                background: theme.palette.background.default,
                borderRadius: 3,
                '& > *': {
                    margin: theme.spacing(1)
                }
            }}
        >
            <Skeleton variant="circular" width={50} height={50} />
            <Stack width={'80%'}>
                <Skeleton variant="rounded" width={'100%'} height={22} marginY={4} />
                <Skeleton variant="rounded" width={'60%'} height={16} className="mt-2" />
            </Stack>
        </Box>
    );
};

export default OrganizerMiniSkeleton;
