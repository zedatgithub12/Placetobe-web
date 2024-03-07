import { Grid, Typography, Avatar, Box, IconButton, useTheme, Button } from '@mui/material';
import { IconMinus, IconPlus, IconTicket } from '@tabler/icons';
import PropTypes from 'prop-types';

const ListTicket = ({ name, price, selected, quantity, onSelect, disable, onDecrement, onIncrement }) => {
    const theme = useTheme();
    return (
        <Grid container marginTop={1.2} sx={{ padding: 1.4, borderRadius: 3, border: 0.5, borderColor: theme.palette.grey[200] }}>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ padding: 1.6, borderRadius: 50, backgroundColor: theme.palette.primary.light }}>
                        <IconTicket size={20} style={{ color: theme.palette.secondary.main }} />
                    </Box>
                    <Typography variant="subtitle1" sx={{ marginLeft: 1.2 }}>
                        {name}
                    </Typography>
                </Box>
                <Typography variant="subtitle2">{price} ETB</Typography>

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
                    <Button variant="contained" disabled={disable} onClick={onSelect} sx={{ borderRadius: 30 }}>
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
