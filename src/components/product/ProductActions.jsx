import { Form, Formik } from 'formik';
import labels from '../../i18n/es.json';
import { Box } from '@mui/system';
import { Button, CircularProgress, FormHelperText, Typography } from '@mui/material';

const ProductActions = ({ options, onAddToCart, cartLoading }) => {
    const initialValues = Object.fromEntries(Object.keys(options).map(key => {
        const initial = options[key].length === 1 ? options[key][0].code : '';
        return [key, initial]
    }
    ));

    const validate = values => {
        const errors = {};
        Object.keys(values).forEach(key => {
            if (!values[key]) {
                errors[key] = labels.product.errors.options.notSelected;
            }
        });
        return errors;
    };

    return (
        <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={values => onAddToCart(values)}
        >
            {({ values, errors, handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit} >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: 2,
                        boxShadow: 3,
                        p: 3,
                        backgroundColor: "background.paper",
                    }}>
                        {Object.keys(options).map((key) => (
                            <>
                                <Box key={key} p={3} borderRadius={3} sx={errors[key] ? { border: 1, borderColor: "#d32f2f" } : {}} >

                                    <Typography variant="subtitle1" gutterBottom>
                                        {labels.product.options[key] || key}:
                                    </Typography>

                                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box'}}>
                                        {options[key].map((option) => (
                                            <Button
                                                key={option.code}
                                                variant={values[key] === option.code ? 'contained' : 'outlined'}
                                                onClick={() => setFieldValue(key, option.code)}
                                            >
                                                {option.name}
                                            </Button>
                                        ))}
                                    </Box>
                                </Box>
                                {errors[key] && (
                                    <FormHelperText error sx={{ ml: 2, mt: 0 }}>
                                        {errors[key]}
                                    </FormHelperText>
                                )}
                            </>
                        ))}
                        <Button type="submit" variant="contained" color="secondary" disabled={cartLoading} startIcon={cartLoading ? <CircularProgress size={20} color="inherit" /> : null}>
                            {cartLoading ? '' : labels.product.actions.addToCart}
                        </Button>
                    </Box>

                </Form>
            )}
        </Formik>
    )
}

export default ProductActions;