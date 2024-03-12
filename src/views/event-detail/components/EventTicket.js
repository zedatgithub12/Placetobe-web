import { Button, Grid, Skeleton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router';
import AnimateButton from 'ui-component/extended/AnimateButton';
import PropTypes from 'prop-types';

const EventTicket = ({ isLoading, onBuyTicket }) => {
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
                    borderColor: theme.palette.grey[200]
                }}
            >
                {isLoading ? (
                    <Skeleton
                        variant="rounded"
                        height={46}
                        width="100%"
                        sx={{ backgroundColor: theme.palette.grey[50], borderRadius: 2 }}
                    />
                ) : (
                    <>
                        {!token && (
                            <AnimateButton>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    fullWidth
                                    sx={{ padding: 1.4, borderRadius: 2, marginBottom: 1.4 }}
                                    onClick={() => navigate('/signin')}
                                >
                                    Signin first
                                </Button>
                            </AnimateButton>
                        )}

                        <AnimateButton>
                            <Button
                                variant="contained"
                                fullWidth
                                sx={{ padding: 1.4, borderRadius: 2 }}
                                disabled={!token}
                                onClick={onBuyTicket}
                            >
                                Buy Ticket
                            </Button>
                        </AnimateButton>
                    </>
                )}
            </Grid>
        </Grid>
    );
};

EventTicket.propTypes = {
    isLoading: PropTypes.bool,
    onBuyTicket: PropTypes.func
};
export default EventTicket;
