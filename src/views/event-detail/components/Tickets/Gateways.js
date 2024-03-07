//import liraries
import { Box, Typography, useTheme } from '@mui/material';
import { IconCircle, IconCircleCheck, IconRadio } from '@tabler/icons';

// payemnt gateway selection component a component
const Gateways = ({ logo, name, isChecked, onPress }) => {
    const theme = useTheme();
    return (
        <Box
            sx={
                isChecked
                    ? {
                          position: 'relative',
                          width: '33%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: 3,
                          paddingX: 2,
                          marginY: 1,
                          border: 0.5,
                          borderColor: theme.palette.success.dark,
                          cursor: 'pointer'
                      }
                    : {
                          position: 'relative',
                          width: '33%',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: 2,
                          paddingX: 2,
                          marginY: 1,
                          cursor: 'pointer'
                      }
            }
            onClick={onPress}
        >
            {isChecked ? (
                <IconCircleCheck size={17} style={{ position: 'absolute', right: 6, top: 6, color: theme.palette.success.dark }} />
            ) : (
                <IconCircle size={16} style={{ position: 'absolute', right: 6, top: 6 }} />
            )}

            <Box>
                <img src={logo} alt={name} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 10 }} />
                <Typography variant="subtitle1">{name}</Typography>
            </Box>
        </Box>
    );
};

export default Gateways;
