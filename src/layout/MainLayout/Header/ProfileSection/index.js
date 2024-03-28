import { useState, useRef, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    ClickAwayListener,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Stack,
    Typography
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';

// assets
import { IconBookmarks, IconLogout, IconSettings, IconTicket, IconUser } from '@tabler/icons';
import Connections from 'api';

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = () => {
    const theme = useTheme();
    const { rememberme, borderRadius } = useSelector((state) => state.customization);
    const navigate = useNavigate();

    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [isLogged, setIsLoged] = useState(false);
    const user = rememberme ? JSON.parse(localStorage.getItem('user')) : JSON.parse(sessionStorage.getItem('user'));
    const picturePreview = user?.profile ? Connections.api + Connections.assets + user?.profile : null;
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };

    const handleToggle = () => {
        if (isLogged) {
            setOpen((prevOpen) => !prevOpen);
        } else {
            navigate('/signin');
        }
    };

    const handleSignout = (event) => {
        localStorage.clear();
        sessionStorage.clear();
        navigate('/');
        location.reload();
        handleClose(event);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    useEffect(() => {
        const token = rememberme ? localStorage.getItem('token') : sessionStorage.getItem('token');
        const user = rememberme ? localStorage.getItem('user') : sessionStorage.getItem('user');

        if (token && user) {
            setIsLoged(true);
        }
        return () => {};
    }, [rememberme]);

    return (
        <>
            <Avatar
                sx={{
                    ...theme.typography.mediumAvatar,
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer',
                    background: theme.palette.warning.light
                }}
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                color="secondary"
                onClick={handleToggle}
            >
                {picturePreview ? (
                    <img
                        src={picturePreview}
                        alt="profile"
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            backgroundColor: theme.palette.background.default,
                            aspectRatio: 1,
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        <IconUser size={24} />
                    </Box>
                )}
            </Avatar>

            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                {isLogged && (
                                    <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                        <Box sx={{ p: 2 }}>
                                            <Stack>
                                                <Stack direction="row" spacing={0.5} alignItems="center">
                                                    <Link
                                                        to="/user/profile"
                                                        component="span"
                                                        style={{
                                                            fontWeight: 400,
                                                            fontSize: 18,
                                                            textTransform: 'capitalize'
                                                        }}
                                                    >
                                                        {user?.first_name} {user?.middle_name}
                                                    </Link>
                                                </Stack>

                                                {user?.email && (
                                                    <Link
                                                        to="/user/profile"
                                                        variant="caption"
                                                        style={{ textDecoration: 'none', color: '#555', marginTop: 2 }}
                                                    >
                                                        {user?.email}
                                                    </Link>
                                                )}
                                            </Stack>
                                        </Box>
                                        <PerfectScrollbar style={{ height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                                            <Divider />
                                            <Box sx={{ p: 1 }}>
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 350,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        },
                                                        '& .MuiListItemButton-root': {
                                                            mt: 0.5
                                                        }
                                                    }}
                                                >
                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/user/profile')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconSettings stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                                                    </ListItemButton>

                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 1}
                                                        onClick={(event) => handleListItemClick(event, 1, '/bookmarks')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconBookmarks stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Bookmarks</Typography>} />
                                                    </ListItemButton>

                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px` }}
                                                        selected={selectedIndex === 2}
                                                        onClick={(event) => handleListItemClick(event, 2, '/tickets')}
                                                    >
                                                        <ListItemIcon>
                                                            <IconTicket stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Your tickets</Typography>} />
                                                    </ListItemButton>

                                                    <ListItemButton
                                                        sx={{ borderRadius: `${borderRadius}px`, marginTop: 6 }}
                                                        selected={selectedIndex === 3}
                                                        onClick={(event) => handleSignout(event)}
                                                    >
                                                        <ListItemIcon>
                                                            <IconLogout stroke={1.5} size="1.3rem" />
                                                        </ListItemIcon>
                                                        <ListItemText primary={<Typography variant="body2">Sign out</Typography>} />
                                                    </ListItemButton>
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                )}
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default ProfileSection;
