import { Grid, Box, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const InfoCard = ({ title, children, actions }) => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: 0.5,
                    borderColor: theme.palette.grey[200],
                    paddingBottom: 1
                }}
            >
                <Typography variant="h4">{title}</Typography>

                {actions && <Box>{actions}</Box>}
            </Grid>

            <Grid item xs={12}>
                {children}
            </Grid>
        </Grid>
    );
};

InfoCard.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
    actions: PropTypes.node
};

export default InfoCard;
