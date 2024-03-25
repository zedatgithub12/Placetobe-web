import { Box, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Comptwo = ({ icon, name, label }) => {
    return (
        <Grid container marginTop={1}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {icon}
                    <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                        {name}
                    </Typography>
                </Box>
                <Typography variant="subtitle2">{label}</Typography>
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
