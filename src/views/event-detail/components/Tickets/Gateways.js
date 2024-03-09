//import liraries
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { IconCircleCheck } from '@tabler/icons';

// payemnt gateway selection component a component
const Gateways = ({ logo, name, isChecked, onPress }) => {
    const theme = useTheme();
    return (
        <Grid
            item
            xs={6}
            sm={6}
            md={3}
            lg={3}
            xl={2}
            sx={
                isChecked
                    ? {
                          position: 'relative',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: 2.4,
                          padding: 1,
                          margin: 1,
                          border: 0.5,
                          borderColor: theme.palette.success.dark,
                          cursor: 'pointer'
                      }
                    : {
                          position: 'relative',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderRadius: 2.4,
                          padding: 1,
                          margin: 1,
                          border: 0.5,
                          borderColor: theme.palette.primary.light,
                          cursor: 'pointer'
                      }
            }
            onClick={onPress}
        >
            {isChecked && (
                <IconCircleCheck size={15} style={{ position: 'absolute', right: 6, top: 6, color: theme.palette.success.dark }} />
            )}

            <Box>
                <img src={logo} alt={name} style={{ height: 40, width: 40, borderRadius: 50, marginRight: 10 }} />
                <Typography variant="subtitle1">{name}</Typography>
            </Box>
        </Grid>
    );
};

export default Gateways;
