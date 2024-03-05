import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Comptwo = ({ icon, name, label }) => {
    return (
        <Grid container marginTop={1}>
            <Grid item xs={12}>
                <Typography variant="subtitle2">{label}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {icon}
                    <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                        {name}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};

Comptwo.propTypes = {
    icon: PropTypes.any,
    name: PropTypes.string,
    label: PropTypes.string
};
export default Comptwo;
