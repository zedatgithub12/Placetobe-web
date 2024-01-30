import { Box, Typography, Avatar } from '@mui/material';
import { useTheme } from '@mui/system';
import Connections from 'api';
import OrganizerMiniSkeleton from 'ui-component/skeleton/organizermini';
import PropTypes from 'prop-types';

const OrgMinicard = ({ isLoading, profile, name }) => {
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
                        <Typography variant="subtitle2">Posted by</Typography>
                        <Typography variant="h4">{name}</Typography>
                    </div>
                </Box>
            )}
        </>
    );
};
OrgMinicard.propTypes = {
    isLoading: PropTypes.bool,
    name: PropTypes.string.isRequired,
    profile: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
};
export default OrgMinicard;
