import { useState } from 'react';
import {
    Button,
    CircularProgress,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup
} from '@mui/material';
import { useFormik } from 'formik';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import Connections from 'api';
import CategoryDropdown from 'ui-component/Dropdowns/Category';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('Your name is required'),
    middle_name: Yup.string().required('Father name is required'),
    last_name: Yup.string().required('Last name is required'),
    gender: Yup.string().required('Gender is required'),
    phone: Yup.string().required('Phone is required')
});
const EditForm = () => {
    const { rememberme } = useSelector((state) => state.customization);
    const user = JSON.parse(localStorage.getItem('user'));
    const formik = useFormik({
        initialValues: {
            first_name: user?.first_name ? user?.first_name : '',
            middle_name: user?.middle_name ? user?.middle_name : '',
            last_name: user?.last_name ? user?.last_name : '',
            gender: user?.gender ? user?.gender : '',
            birthdate: user?.birthdate ? user?.birthdate : '',
            address: user?.address ? user?.address : '',
            phone: user?.phone ? user?.phone : '',
            category: user?.category ? user?.category : ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmission(values);
        }
    });

    const [isSubmitting, setIsSubmitting] = useState(formik.isSubmitting);

    const handleSessions = (user) => {
        rememberme ? localStorage.setItem('user', JSON.stringify(user)) : sessionStorage.setItem('user', JSON.stringify(user));
    };
    const handleSubmission = (values) => {
        setIsSubmitting(true);
        const token = localStorage.getItem('token');

        const Api = Connections.api + Connections.updateUserInfo + user?.id;
        const headers = {
            authorization: `Bearer ${token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        };

        const data = {
            userId: user?.id,
            firstName: values.first_name,
            middleName: values.middle_name,
            lastName: values.last_name,
            birthDate: values.birthDate,
            gender: values.gender,
            living_address: values.address,
            category: values.category,
            Phone: values.phone
        };

        //save user info into database
        fetch(Api, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    setIsSubmitting(false);
                    handlePrompt(response.message, 'success');
                    handleSessions(response.data);
                } else {
                    setIsSubmitting(false);
                    handlePrompt(response.message, 'error');
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                handlePrompt(error.message, 'error');
            });
    };

    const handlePrompt = (message, severity) => {
        enqueueSnackbar(message, { variant: severity });
    };
    return (
        <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ minWidth: '80%' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={12} md={5.8}>
                    <InputLabel htmlFor="first_name" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        First name
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.first_name && Boolean(formik.errors.first_name)}>
                        <OutlinedInput
                            id="first_name"
                            name="first_name"
                            fullWidth
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.first_name && formik.errors.first_name && (
                            <FormHelperText error id="standard-weight-helper-text-first_name">
                                {formik.errors.first_name}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} md={5.8}>
                    <InputLabel htmlFor="middle_name" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Middle name
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.middle_name && Boolean(formik.errors.middle_name)}>
                        <OutlinedInput
                            id="middle_name"
                            name="middle_name"
                            fullWidth
                            value={formik.values.middle_name}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.middle_name && formik.errors.middle_name && (
                            <FormHelperText error id="standard-weight-helper-text-middle_name">
                                {formik.errors.middle_name}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="last_name" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Last name
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.last_name && Boolean(formik.errors.last_name)}>
                        <OutlinedInput
                            id="last_name"
                            name="last_name"
                            fullWidth
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.last_name && formik.errors.last_name && (
                            <FormHelperText error id="standard-weight-helper-text-last_name">
                                {formik.errors.last_name}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="birthdate" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Birth date
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.birthdate && Boolean(formik.errors.birthdate)}>
                        <OutlinedInput
                            id="birthdate"
                            name="birthdate"
                            type="date"
                            fullWidth
                            value={formik.values.birthdate}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.birthdate && formik.errors.birthdate && (
                            <FormHelperText error id="standard-weight-helper-text-birthdate">
                                {formik.errors.birthdate}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl error={formik.touched.gender && Boolean(formik.errors.gender)} sx={{ marginLeft: 0.8, marginTop: 2.4 }}>
                        <FormLabel id="gender" color="secondary">
                            Gender
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="gender"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            color="secondary"
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-around'
                            }}
                        >
                            <FormControlLabel value="male" control={<Radio color="secondary" />} label="Male" />
                            <FormControlLabel value="female" control={<Radio color="secondary" />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="phone" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Phone number
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.phone && Boolean(formik.errors.phone)}>
                        <OutlinedInput
                            id="phone"
                            name="phone"
                            type="tel"
                            fullWidth
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.phone && formik.errors.phone && (
                            <FormHelperText error id="standard-weight-helper-text-phone">
                                {formik.errors.phone}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="Address" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Address
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.living_address && Boolean(formik.errors.living_address)}>
                        <OutlinedInput
                            id="living_address"
                            name="living_address"
                            fullWidth
                            value={formik.values.living_address}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.living_address && formik.errors.living_address && (
                            <FormHelperText error id="standard-weight-helper-text-living_address">
                                {formik.errors.living_address}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="phone" sx={{ marginTop: 2, marginBottom: 0.5, paddingLeft: 1 }}>
                        Category
                    </InputLabel>
                    <CategoryDropdown name="category" selectedCategory={formik.values.category} onCategoryChange={formik.handleChange} />
                </Grid>

                <Grid item xs={12} marginTop={3}>
                    <Button type="submit" variant="contained" color="secondary" fullWidth sx={{ padding: 1.4, borderRadius: 2 }}>
                        {isSubmitting ? <CircularProgress size={20} sx={{ color: 'white' }} /> : 'Save'}
                    </Button>
                </Grid>
            </Grid>
            <SnackbarProvider maxSnack={3} />
        </form>
    );
};

export default EditForm;
