import { Typography, Grid, IconButton, useTheme } from '@mui/material';
import faqFooter from 'data/faqFooter';

const Footer = () => {
    const theme = useTheme();

    return (
        <Grid
            item
            container
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{ background: theme.palette.background.default, minHeight: 230, width: 'inherit' }}
        >
            <Grid item xs={12} mb={2}>
                <Typography variant="h3" style={{ textAlign: 'left' }}>
                    Get In Touch
                </Typography>
            </Grid>
            <Grid container justifyContent="space-around" pl={2}>
                {faqFooter.map((category, index) => (
                    <Grid
                        item
                        md={2}
                        sm={4}
                        xs={6}
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '0 12px',
                            cursor: 'pointer',
                            marginY: 2
                        }}
                    >
                        <IconButton
                            sx={{
                                width: 64,
                                height: 64,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                marginBottom: theme.spacing(1)
                            }}
                        >
                            {category.icon}
                        </IconButton>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                textAlign: 'center'
                            }}
                            className="categoryname"
                        >
                            {category.title}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                            sx={{
                                fontWeight: 500,
                                textTransform: 'capitalize',
                                textAlign: 'center'
                            }}
                            className="categoryname"
                        >
                            {category.description[0]}
                            {category.description[1]}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
};

export default Footer;
