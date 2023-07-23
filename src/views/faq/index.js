import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Footer from 'ui-component/faq/footer';
import { Button, Divider, Grid, IconButton, InputBase, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { IconSearch } from '@tabler/icons';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import faq from 'data/faq';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(3)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(9),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function Faq() {
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState('');
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const filteredAccordionData = faq.filter((data) => data.title.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
        <div>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item container direction="row" md={12} mb={2} alignItems="center" justifyContent="flex-start">
                    <Grid item container direction="row" alignItems="center" md={3} xs={6}>
                        <IconButton
                            sx={{
                                width: 40,
                                height: 40,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: '50%',
                                marginLeft: theme.spacing(2),
                                background: 'white'
                            }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h3" pl={4}>
                            FAQ
                        </Typography>
                    </Grid>
                    <Grid item md={6} xs={6}>
                        <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 'inherit' }}>
                            <IconButton sx={{ p: '10px' }} aria-label="search">
                                <IconSearch />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search.."
                                inputProps={{ 'aria-label': 'search' }}
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />

                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton color="black" sx={{ p: '10px' }} aria-label="search">
                                <ArrowForwardIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item md={9} mt={2} sx={{ borderRadius: '3%', overflow: 'hidden', border: '0.5px solid rgba(0, 0, 0, 0.125)' }}>
                    {filteredAccordionData.map((data, index) => (
                        <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                            <AccordionSummary aria-controls={`panel${index}d-content`} id={`panel${index}d-header`}>
                                <Typography variant="body1">{data.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body2">{data.description}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Grid>

                <Grid item md={9} xs={12} container alignItems="center" justifyContent="flex-end" pt={4}>
                    <Grid md={6} sm={8} xs={11}>
                        <Typography variant="body1">If you don't get what you are asking for please contact us.</Typography>
                    </Grid>
                    <Grid md={2} sm={2} xs={8}>
                        <Button variant="contained" sx={{ background: theme.palette.warning.dark }}>
                            {' '}
                            contact us
                        </Button>
                    </Grid>
                </Grid>
                <Grid item md={11} mt={6} sx={{ borderRadius: '5%', padding: '20px', overflow: 'hidden' }}>
                    <Footer />
                </Grid>
            </Grid>
        </div>
    );
}
