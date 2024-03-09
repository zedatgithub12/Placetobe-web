import { Button, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import AnimateButton from 'ui-component/extended/AnimateButton';
import PropTypes from 'prop-types';

const EventTicket = ({ onBuyTicket }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    return (
        <Grid container>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
                sx={{
                    borderRadius: 3,
                    border: 0.5,
                    borderColor: theme.palette.grey[200],
                    width: '100%',
                    padding: 1.2,
                    '& > *': {
                        margin: theme.spacing(2)
                    }
                }}
            >
                {!token && (
                    <AnimateButton>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{ padding: 1.4, borderRadius: 2 }}
                            onClick={() => navigate('/signin')}
                        >
                            Signin first
                        </Button>
                    </AnimateButton>
                )}

                <AnimateButton>
                    <Button variant="contained" fullWidth sx={{ padding: 1.4, borderRadius: 2 }} disabled={!token} onClick={onBuyTicket}>
                        Buy Ticket
                    </Button>
                </AnimateButton>
            </Grid>
        </Grid>
    );
};

EventTicket.propTypes = {
    onBuyTicket: PropTypes.func
};
export default EventTicket;
