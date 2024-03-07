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
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full name is required'),
    phone: Yup.string().required('Phone is required')
});

const PersonalInfo = ({ handleSubmission }) => {
    const formik = useFormik({
        initialValues: {
            full_name: '',
            phone: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleSubmission(values);
        }
    });

    return (
        <form noValidate onSubmit={formik.handleSubmit} onReset={formik.handleReset} style={{ minWidth: '80%' }}>
            <Grid container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Grid item xs={12} sm={12}>
                    <InputLabel htmlFor="full_name" sx={{ marginTop: 1, marginBottom: 0.5, paddingLeft: 1 }}>
                        Full name
                    </InputLabel>
                    <FormControl fullWidth error={formik.touched.full_name && Boolean(formik.errors.full_name)}>
                        <OutlinedInput
                            id="full_name"
                            name="full_name"
                            fullWidth
                            value={formik.values.full_name}
                            onChange={formik.handleChange}
                        />

                        {formik.touched.full_name && formik.errors.full_name && (
                            <FormHelperText error id="standard-weight-helper-text-full_name">
                                {formik.errors.full_name}
                            </FormHelperText>
                        )}
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <InputLabel htmlFor="phone" sx={{ marginTop: 1, marginBottom: 0.5, paddingLeft: 1 }}>
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
            </Grid>
        </form>
    );
};

export default PersonalInfo;
