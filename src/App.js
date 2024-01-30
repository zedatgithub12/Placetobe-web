import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';

// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router';

// ==============================|| APP ||============================== //

const App = () => {
    const customization = useSelector((state) => state.customization);
    const navigate = useNavigate();

    useEffect(() => {
        const handleUrlChange = () => {
            const url = window.location.href;
            const regex = /\/event\/(\d+)/; // Regex to match the event URL format

            const match = url.match(regex);

            if (match) {
                const eventId = match[1];
                navigate('/event-detail', {
                    state: { id: eventId }
                });
            }
        };

        handleUrlChange(); // Handle the initial URL on component mount

        window.addEventListener('popstate', handleUrlChange); // Listen for URL changes

        return () => {
            window.removeEventListener('popstate', handleUrlChange); // Clean up the event listener
        };
    }, [navigate]);
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes(customization)}>
                <CssBaseline />
                <NavigationScroll>
                    <Routes />
                </NavigationScroll>
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default App;
