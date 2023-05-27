import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalIncomeLightCard = ({ isLoading }) => {
    return (
        <Grid container>
            <Grid xs={4} spacing={2}>
                {isLoading ? (
                    <TotalIncomeCard />
                ) : (
                    <CardWrapper border={false} content={false}>
                        <Box width="300px" sx={{ p: 8 }}></Box>
                    </CardWrapper>
                )}
            </Grid>

            <Grid xs={4} spacing={2}>
                {isLoading ? (
                    <TotalIncomeCard />
                ) : (
                    <CardWrapper border={false} content={false}>
                        <Box width="300px" sx={{ p: 8 }}></Box>
                    </CardWrapper>
                )}
            </Grid>
            <Grid xs={4} spacing={2}>
                {isLoading ? (
                    <TotalIncomeCard />
                ) : (
                    <CardWrapper border={false} content={false}>
                        <Box width="300px" sx={{ p: 8 }}></Box>
                    </CardWrapper>
                )}
            </Grid>
        </Grid>
    );
};

TotalIncomeLightCard.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalIncomeLightCard;
