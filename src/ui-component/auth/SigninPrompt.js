import { Grid, Box, Button, Typography, Divider, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from 'ui-component/Logo';

const SigninPrompt = () => {
    const theme = useTheme();
    return (
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{ textAlign: 'center' }}>
                    <Logo />
                    <Typography variant="h4" sx={{ mt: 4, mb: 1 }}>
                        Please signin first
                    </Typography>

                    <Typography variant="subtitle2">For better exprience of the platform, stay signed in</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Button sx={{ mt: 2, backgroundColor: theme.palette.warning.dark, color: theme.palette.dark.main }}>Sign In</Button>
                    <Button sx={{ mt: 2, color: theme.palette.dark.main, border: 0.3 }}>Continue with Google</Button>
                    <Button sx={{ mt: 1, color: theme.palette.grey[500], fontSize: theme.typography.body1 }}>Create an account</Button>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 2
                    }}
                >
                    <Link to="/" style={{ fontSize: 10, marginRight: 2, textDecoration: 'none' }}>
                        Privacy policy |
                    </Link>
                    <Divider orientation="vertical" sx={{ width: 3 }} />
                    <Link to="/" style={{ fontSize: 10, textDecoration: 'none' }}>
                        Terms
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default SigninPrompt;
