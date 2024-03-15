import { Box, Grid, Typography, useTheme } from '@mui/material';
import Logo from 'ui-component/Logo';

const PrivacyPolicy = () => {
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
                                Place to be Ethiopia privacy policy
                            </Typography>
                        </Box>
                        <Typography variant="body2">
                            At Place to be Ethiopia, we are committed to protecting your privacy. This Privacy Policy describes how we
                            collect, use, and disclose your personal information when you use our mobile app and website. By using our
                            services, you consent to the practices described in this Privacy Policy.
                        </Typography>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 1. Information We Collect</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                <b> 1.1 Personal Information:</b> We may collect personal information such as your name, email address, and
                                phone number when you create an account, make a booking, or contact us for support.
                            </Typography>
                            <Typography variant="body2" marginY={1}>
                                <b> 1.2 Location Information: </b> With your consent, we may collect and process information about your
                                precise location to provide you with location-based services.
                            </Typography>
                            <Typography variant="body2" marginY={1}>
                                <b> 1.3 Usage Information:</b> We collect information about how you interact with our app and website,
                                including the features you use, the content you view, and the actions you take.
                            </Typography>
                            <Typography variant="body2" marginY={1}>
                                <b> 1.4 Device Information: </b> We may collect device-specific information such as your device model,
                                operating system version, and unique device identifiers.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 2. How We Use Your Information</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                <b> 2.1 Provide and Improve our Services: </b> We use your information to provide and personalise our
                                services, improve app and website functionality, and optimise user experience.
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                <b> 2.2 Communication: </b> We may use your contact information to send you important updates,
                                notifications, and promotional materials.
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                <b> 2.3 Analytics and Research: </b> We may use your information for analytics purposes to understand app
                                and website usage trends, evaluate the effectiveness of our features, and conduct research to improve our
                                services.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 3. Information Sharing and Disclosure</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                <b> 3.1 Service Providers </b> We may share your information with trusted third-party service providers who
                                assist us in operating our app and website and providing the services.
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                <b> 3.2 Legal Requirements </b> We may disclose your information if required by law, court order, or to
                                protect our rights, safety, or property.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 4. Data Security</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                We take reasonable measures to protect your personal information from unauthorised access, alteration,
                                disclosure, or destruction. However, no method of transmission over the internet or electronic storage is
                                100% secure.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 5. Children's Privacy</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                Our app and website are not intended for children under the age of 13. We do not knowingly collect personal
                                information from children. If you believe we have inadvertently collected information from a child, please
                                contact us immediately.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 6. Changes to the Privacy Policy</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                We reserve the right to modify this Privacy Policy at any time. Any changes will be effective immediately
                                upon posting the updated Privacy Policy on our website
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="h4" marginY={2}>
                                <b> 7. Contact Us</b>
                            </Typography>

                            <Typography variant="body2" marginY={1}>
                                If you have any questions or concerns about our Privacy Policy or our privacy practices, please contact us
                                at contact@placetobeethiopia.com.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body2" marginY={2}>
                                By using the Place to be Ethiopia mobile app and website, you acknowledge that you have read and understood
                                this Privacy Policy and agree to the collection, use, and disclosure of your personal information as
                                described herein.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PrivacyPolicy;
