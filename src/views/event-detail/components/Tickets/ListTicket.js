import { Grid, Typography, Box, IconButton, useTheme, Button, useMediaQuery } from '@mui/material';
import { IconMinus, IconPlus, IconTicket } from '@tabler/icons';
import PropTypes from 'prop-types';

const ListTicket = ({ name, price, selected, quantity, onSelect, disable, onDecrement, onIncrement }) => {
    const theme = useTheme();

    const smallDevice = useMediaQuery(theme.breakpoints.down('md'));
    return (
        <Grid container marginTop={1.2} sx={{ padding: 1.4, borderRadius: 3, border: 0.5, borderColor: theme.palette.grey[200] }}>
            <Grid item xs={12} sm={6} md={2} lg={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ padding: 1.2, borderRadius: 50, border: 0.5, borderColor: theme.palette.primary.light }}>
                    <IconTicket size={20} style={{ color: theme.palette.primary.dark }} />
                </Box>
            </Grid>

            <Grid item xs={6} sm={6} md={4} lg={4} sx={{ display: 'flex', alignItems: 'flex-start', marginTop: 1 }}>
                <Typography variant="subtitle1">{name}</Typography>
            </Grid>

            <Grid
                item
                xs={6}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 1 }}
            >
                <Typography variant="subtitle2">{price} ETB</Typography>
            </Grid>

            <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={3}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: smallDevice ? 'flex-start' : 'flex-end', marginTop: 1 }}
            >
                {selected ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <IconButton onClick={onDecrement}>
                            <IconMinus size={16} />
                        </IconButton>
                        <Typography variant="subtitle1">{quantity}</Typography>
                        <IconButton onClick={onIncrement}>
                            <IconPlus size={16} />
                        </IconButton>
                    </Box>
                ) : (
                    <Button variant="outlined" color="secondary" disabled={disable} onClick={onSelect} sx={{}}>
                        Buy
                    </Button>
                )}
            </Grid>
        </Grid>
    );
};

ListTicket.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    selected: PropTypes.bool,
    disable: PropTypes.bool,
    quantity: PropTypes.number,
    onDecrement: PropTypes.func,
    onIncrement: PropTypes.func,
    onSelect: PropTypes.func
};

export default ListTicket;
