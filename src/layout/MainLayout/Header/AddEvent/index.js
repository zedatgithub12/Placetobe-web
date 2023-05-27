import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import { IconPlus } from '@tabler/icons';

const AddEvent = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                ml: 2,
                mr: 3,
                [theme.breakpoints.down('md')]: {
                    mr: 2
                }
            }}
        >
            <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                    variant="rounded"
                    sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        transition: 'all .2s ease-in-out',
                        background: theme.palette.grey[200],
                        color: theme.palette.grey[700],
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            background: theme.palette.warning.dark,
                            color: theme.palette.grey[700]
                        }
                    }}
                    color="inherit"
                >
                    <IconPlus stroke={1.5} size="1.3rem" />
                </Avatar>
            </ButtonBase>
        </Box>
    );
};

export default AddEvent;
