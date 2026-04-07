import { Divider, Grid, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

const AgreementLinks = () => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                <Link
                    to="/privacy-policy"
                    style={{
                        marginRight: 4,
                        textDecoration: 'none',
                        fontSize: 12,
                        fontFamily: theme.typography.fontFamily
                    }}
                >
                    Privacy policy
                </Link>
                <Divider orientation="vertical" />
                <Link
                    to="/terms-of-agreement"
                    style={{
                        marginLeft: 4,
                        textDecoration: 'none',
                        fontSize: 12,
                        fontFamily: theme.typography.fontFamily
                    }}
                >
                    Terms
                </Link>
            </Grid>
        </Grid>
    );
};

export default AgreementLinks;
