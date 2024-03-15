import { Grid, Typography, useTheme } from '@mui/material';

const Refunding = () => {
    const theme = useTheme();
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: theme.palette.background.default,
                            border: 0.5,
                            borderColor: theme.palette.grey[200],
                            borderRadius: 2,
                            padding: 2
                        }}
                    >
                        <Typography variant="subtitle1">Refunding Policy</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Refunding;
