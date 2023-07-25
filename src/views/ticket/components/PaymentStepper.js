import { useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Grid, Box, IconButton, Typography, ListItemIcon, Skeleton } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import RightCheckout from './RightCkeckout';
import LeftCheckout from './LeftCheckout';
import Modal from '@mui/material/Modal';
import { Card, CardContent, CardActionArea } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)'
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#ff9900'
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#ff9900'
        }
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1
    }
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#ff9900'
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#ff9900',
        zIndex: 1,
        fontSize: 18
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor'
    }
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    className: PropTypes.string,
    completed: PropTypes.bool
};

const steps = ['Choose number of tickets', 'Choose Payment Method', 'Checkout'];
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    bgcolor: 'rgba(255, 255, 255, 0.4)'
};
export default function PaymentStepper({ ticket, event }) {
    const [numberOfTicket, setNumberOfTicket] = useState(1);
    const [activeStep, setActiveStep] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const theme = useTheme();

    const handlePayButtonClick = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    const handleNextStep = () => {
        if (activeStep === steps.length - 1) {
            return;
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };
    let totalPrice = (ticket.currentprice * numberOfTicket).toFixed(2);

    return (
        <>
            <Grid item xs={12} sm={6} md={6} lg={4} xl={3} style={{ textDecoration: 'none' }} onClick={() => handlePayButtonClick()}>
                <Card variant="outlined">
                    <CardActionArea>
                        <LazyLoadImage
                            component="img"
                            src={ticket.event_image}
                            width={300}
                            height={300}
                            className="img-fluid rounded m-auto me-1"
                            placeholder={<Skeleton variant="rectangular" height={300} width={300} />}
                        />

                        <CardContent>
                            <Typography gutterBottom variant="h3" mb={1}>
                                {ticket.event_name}
                            </Typography>

                            <Box display="flex" alignItems="center">
                                <Typography variant="h4" className="fw-semibold" mb={1}>
                                    Price {ticket.currentprice === '0' ? 'Free' : ticket.currentprice + ' ETB'}
                                </Typography>
                            </Box>
                            <Box>
                                <Button variant="contained" style={{ backgroundColor: '#FFBB00', color: '#FFFFFF' }} mt={1} fullWidth>
                                    Pay
                                </Button>
                            </Box>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Grid container sx={{ ...style, backgroundColor: 'white' }} borderRadius={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pt={4} borderRadius={2}>
                        <Grid container>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Box fullWidth display="flex" flexDirection={'row'}>
                                    <Box sx={{ width: '100%' }} mb={3}>
                                        <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
                                            {steps.map((label) => (
                                                <Step key={label}>
                                                    <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Box>
                                    <IconButton sx={{ position: 'absolute', top: 0, right: 0 }} onClick={handleCloseModal}>
                                        <CancelIcon color="red" />
                                    </IconButton>
                                </Box>
                            </Grid>
                            <Grid container xs={12} sm={12} md={12} lg={12} xl={12}>
                                {activeStep === 0 ? (
                                    <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                        {ticket.event_image ? (
                                            <LazyLoadImage
                                                component="img"
                                                delayTime={200}
                                                src={'https://picsum.photos/400/400'}
                                                width={400}
                                                height={400}
                                                className="img-fluid"
                                                placeholder={<Skeleton variant="rectangular" width={400} height={400} />}
                                            />
                                        ) : (
                                            <Skeleton variant="rectangular" width={400} height={400} />
                                        )}
                                    </Grid>
                                ) : (
                                    <LeftCheckout quantity={numberOfTicket} event={event} ticket={ticket} />
                                )}
                                <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent={'space-between'}
                                        p={2}
                                        width={400}
                                        height={400}
                                    >
                                        {activeStep === 0 ? (
                                            <>
                                                <Box
                                                    display={'flex'}
                                                    flexDirection="column"
                                                    justifyContent={'center'}
                                                    alignItems={'center'}
                                                >
                                                    <Typography variant="h3">{'Main ticket Abageda'}</Typography>
                                                    <Box>
                                                        <Typography variant="h4" className="fw-semibold">
                                                            Price {ticket.currentprice === 0 ? 'Free' : ticket.currentprice + ' ETB'}
                                                        </Typography>
                                                        <Typography variant="h4" className="fw-semibold">
                                                            Type {ticket.tickettype}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
                                                    <Typography className="fw-bold" variant="h2">{`${totalPrice} ETB`}</Typography>
                                                </Box>
                                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" mt={3}>
                                                    <IconButton
                                                        onClick={() => {
                                                            if (numberOfTicket > 1) {
                                                                setNumberOfTicket(numberOfTicket - 1);
                                                            }
                                                        }}
                                                        sx={{
                                                            width: 40,
                                                            maxWidth: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            backgroundColor: '#F5F5F5',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <RemoveIcon />
                                                    </IconButton>

                                                    <Box display={'flex'} justifyContent={'center'} width={50}>
                                                        <Typography variant="h4" className="fw-semibold" mb={1}>
                                                            {numberOfTicket}
                                                        </Typography>
                                                    </Box>

                                                    <IconButton
                                                        onClick={() => {
                                                            setNumberOfTicket(numberOfTicket + 1);
                                                        }}
                                                        sx={{
                                                            width: 40,
                                                            maxWidth: 40,
                                                            height: 40,
                                                            borderRadius: '50%',
                                                            backgroundColor: '#F5F5F5',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center'
                                                        }}
                                                    >
                                                        <AddIcon />
                                                    </IconButton>
                                                </Box>
                                                <Box display="flex" justifyContent="center" mt={3}>
                                                    <Button
                                                        style={{ backgroundColor: '#FFBB00', color: '#FFFFFF' }}
                                                        color="warning"
                                                        fullWidth
                                                        variant="contained"
                                                        onClick={handleNextStep}
                                                    >
                                                        {activeStep === 0 ? 'Checkout' : `${totalPrice} Pay`}
                                                    </Button>
                                                </Box>
                                            </>
                                        ) : (
                                            <Box height={'100%'}>
                                                <RightCheckout />
                                            </Box>
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Modal>
        </>
    );
}

PaymentStepper.propTypes = {
    ticket: PropTypes.shape({
        id: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired,
        ticket_id: PropTypes.string.isRequired,
        ticket_image: PropTypes.string.isRequired,
        ticket_name: PropTypes.string.isRequired,
        tickettype: PropTypes.string.isRequired,
        currentprice: PropTypes.number.isRequired,
        originalprice: PropTypes.number.isRequired,
        currentamount: PropTypes.number.isRequired,
        addeddate: PropTypes.string.isRequired,
        expireddate: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired
    }),
    event: PropTypes.shape({
        event_name: PropTypes.string.isRequired,
        event_image: PropTypes.string.isRequired,
        start_date: PropTypes.string.isRequired,
        end_date: PropTypes.string.isRequired,
        start_time: PropTypes.string.isRequired,
        end_time: PropTypes.string.isRequired,
        event_address: PropTypes.string.isRequired,
        event_entrance_fee: PropTypes.string.isRequired
    })
};
