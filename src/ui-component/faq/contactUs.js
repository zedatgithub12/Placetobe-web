import { Box, Button, Grid, TextField, Typography, useTheme } from '@mui/material';
import image from '../../assets/images/popupimage.png';
import { useState } from 'react';
import { styled } from '@mui/material/styles';

const initialFValues = {
    id: 0,
    name: '',
    email: '',
    mobile: '',
    comment: ''
};

const ColorButton = styled(Button)(({ theme }) => ({
    color: 'black',
    backgroundColor: theme.palette.warning.dark,
    '&:hover': {
        backgroundColor: theme.palette.warning.dark,
        cursor: 'pointer'
    }
}));

export default function ContactUs() {
    const theme = useTheme();

    const [values, setFormValues] = useState(initialFValues);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setFormValues(initialFValues);
        console.log('Form data:', values);
    };
    return (
        <Grid container sx={{ width: '100%' }}>
            <Grid item direction="row" md={6} xs={12} sx={{ background: '#F3F3F3' }}>
                <Typography variant="h4" p={1}>
                    Drop Message
                </Typography>
                <Box p={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={image} alt="contact us" style={{ width: '275px', height: 'auto' }} />
                </Box>
            </Grid>
            <Grid item md={6} xs={12} p={3} sx={{ padding: theme.spacing(4) }}>
                <TextField
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    size="small"
                    sx={{ margin: theme.spacing(1), width: '100%', background: 'white' }}
                />
                <TextField
                    variant="outlined"
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    size="small"
                    sx={{ margin: theme.spacing(1), width: '100%' }}
                />
                <TextField
                    variant="outlined"
                    label="Mobile"
                    name="mobile"
                    value={values.mobile}
                    onChange={handleInputChange}
                    size="small"
                    sx={{ margin: theme.spacing(1), width: '100%' }}
                />
                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    placeholder="write here.."
                    name="comment"
                    value={values.comment}
                    onChange={handleInputChange}
                    sx={{ margin: theme.spacing(1), width: '100%' }}
                />
                <ColorButton variant="contained" onClick={handleSubmit} sx={{ width: '100%', margin: theme.spacing(1) }}>
                    Send
                </ColorButton>
            </Grid>
        </Grid>
    );
}
