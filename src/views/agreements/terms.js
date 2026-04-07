import { Box, Grid, Typography, useTheme } from '@mui/material';
import Logo from 'ui-component/Logo';

const Terms = () => {
    const theme = useTheme();
    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} sm={12} md={10} lg={8} xl={6} paddingY={4}>
                <Grid container>
                    <Grid
                        item
                        xs={12}
                        sx={{
                            backgroundColor: theme.palette.background.default,
                            border: 0.5,
                            borderColor: theme.palette.grey[200],
                            borderRadius: 2,
                            padding: 3
                        }}
                    >
                        <Box>
                            <Logo />
                            <Typography variant="h3" marginY={2.2}>
                                Terms of Agreements
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                Basic Terms
                            </Typography>
                            <ul>
                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        You may not post nude, partially nude, or sexually suggestive photos.
                                    </Typography>
                                </li>
                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        You are responsible for any activity that occurs under your screen name.{' '}
                                    </Typography>
                                </li>
                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        You must not abuse, harass, threaten, impersonate or intimidate other place to be users.
                                    </Typography>
                                </li>
                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        You may not use the place to be service for any illegal or unauthorized purpose. International users
                                        agree to comply with all local laws regarding online conduct and acceptable content.
                                    </Typography>{' '}
                                </li>
                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        You are solely responsible for your conduct and any data, text, information, screen names, graphics,
                                        photos, profiles, and links ("Content") that you submit, and display on the place to be service.
                                    </Typography>{' '}
                                </li>
                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        You must not modify, adapt or hack place to be or modify another Mobile App so as to falsely imply
                                        that it is associated with place to be.
                                    </Typography>{' '}
                                </li>

                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        You must not crawl, scrape, or otherwise cache any content from place to be including but not
                                        limited to user profiles and photos.
                                    </Typography>{' '}
                                </li>

                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        You must not create or submit unwanted email or infos to any place to be system ("Spam").
                                    </Typography>
                                </li>

                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        You must not transmit any worms or viruses or any code of a destructive nature.
                                    </Typography>
                                </li>

                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        You must not, in the use of place to be, to violate any laws in your jurisdiction (including but not
                                        limited to copyright laws)
                                    </Typography>
                                </li>

                                <li>
                                    <Typography variant="body2" marginY={1}>
                                        Violation of any of these agreements will result in the termination of your place to be ethiopia
                                        account. While place to be prohibits such conduct and content on its web and Mobile App
                                    </Typography>
                                </li>
                            </ul>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                General Conditions
                            </Typography>
                            <ul>
                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        We reserve the right to modify or terminate the place to be ethiopia service for any reason, without
                                        notice at any time.
                                    </Typography>
                                </li>

                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        We reserve the right to alter these Terms of Use at any time. If the alterations constitute a
                                        material change to the Terms of Use, we will notify you via email according to the preference
                                        expressed on your account. What constitutes a "material change" will be determined at our sole
                                        discretion, in good faith and using common sense and reasonable judgement.
                                    </Typography>
                                </li>

                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        We reserve the right to refuse service to anyone for any reason at any time
                                    </Typography>
                                </li>

                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        We reserve the right to force forfeiture of any username that becomes inactive, violates trademark,
                                        or may mislead other users.
                                    </Typography>
                                </li>

                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        We reserve the right to reclaim usernames on behalf of businesses or individuals that hold legal
                                        claim or trademark on those usernames.
                                    </Typography>
                                </li>

                                <li>
                                    {' '}
                                    <Typography variant="body2" marginY={1}>
                                        We may, but have no obligation to, remove Content and accounts containing Content that we determine
                                        in our sole discretion are unlawful, offensive, threatening, libelous, defamatory, obscene or
                                        otherwise objectionable or violates any party's intellectual property or these Terms of Use.
                                    </Typography>
                                </li>
                            </ul>
                        </Box>

                        <Box>
                            <Typography variant="body2" marginY={2}>
                                By using the Place to be Ethiopia mobile app and website, you acknowledge that you have read and understood
                                this Terms of agreement and agree to bound by the terms and conditions.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Terms;
