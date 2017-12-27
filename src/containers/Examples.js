import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from 'material-ui/styles';

import {Formik} from 'formik';
import TextField from '../components/TextField';
import CountrySelect from '../components/Country';
import RegionSelect from '../components/Region';
import PostcodeTextField from '../components/Postcode';
import PhoneNumberTextField from '../components/PhoneNumber';
import EmailTextField from '../components/Email';
import UrlTextField from '../components/Url';
import PasswordTextField from '../components/Password';
import QuantityTextField from '../components/Quantity';

import countrySchema from '../components/Country/schema.json';

const schema = {
    name: {
        "type":"string"
    },
    line1: {
        "type":"string"
    },
    line2: {
        "type":"string"
    },
    city: {
        "type":"string"
    },
    region: {
        "type":"string"
    },
    postcode: {
        "type":"string"
    },
    country: countrySchema.definitions.country,
    phone: {
        "type":"string"
    },
    email: {
        "type":"string"
    },
    url: {
        "type":"string"
    },
    password: {
        "type":"string"
    },
    height: {
        "type":"nubmer"
    }
};

const styles = () => ({
    root: {}
});

const Examples = (props) => {
    const { classes, intl } = props;

    const form = (formik) => {
        const {values, touched, errors, handleChange, handleBlur, handleSubmit, isValid} = formik;
        //console.log('formik', values);
        return (
            <form onSubmit={handleSubmit} autoComplete="false" noValidate>

                <TextField
                    name="name"
                    schema={schema.name}

                    value={values.name}
                    touched={touched.name}
                    error={errors.name}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />

                <CountrySelect
                    name="country"
                    schema={schema.country}

                    value={values.country}
                    touched={touched.country}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.country}

                    label
                    required
                    fullWidth
                />

                <TextField
                    name="line1"
                    schema={schema.line1}

                    value={values.line1}
                    touched={touched.line1}
                    error={errors.line1}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    uppercase
                    fullWidth
                />
                <TextField
                    name="line2"
                    schema={schema.line2}

                    value={values.line2}
                    touched={touched.line2}
                    error={errors.line2}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    label
                    uppercase
                    fullWidth
                />
                <TextField
                    name="city"
                    schema={schema.city}

                    value={values.city}
                    touched={touched.city}
                    error={errors.city}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    uppercase
                    fullWidth
                />

                <RegionSelect
                    name="region"
                    country={values.country}

                    value={values.region}
                    touched={touched.region}
                    error={errors.region}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    label={'Region'}
                    required
                    fullWidth
                />

                <PostcodeTextField
                    name="postcode"
                    country={values.country}
                    region={values.region}

                    value={values.postcode}
                    touched={touched.postcode}
                    error={errors.postcode}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />


                <PhoneNumberTextField
                    name="phone"
                    country={values.country}

                    value={values.phone}
                    touched={touched.phone}
                    error={errors.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />


                <EmailTextField
                    name="email"
                    schema={schema.email}

                    value={values.email}
                    touched={touched.email}
                    error={errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />


                <UrlTextField
                    name="url"
                    schema={schema.url}

                    value={values.url}
                    touched={touched.url}
                    error={errors.url}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />
                <PasswordTextField
                    name="password"
                    schema={schema.password}

                    value={values.password}
                    touched={touched.password}
                    error={errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />

                <QuantityTextField
                    name="height"
                    unit="cm"
                    base="m"
                    schema={schema.height}

                    value={values.height}
                    touched={touched.height}
                    error={errors.height}
                    onChange={handleChange}
                    onBlur={handleBlur}

                    required
                    label
                    fullWidth
                />

            </form>
        )
    };

    return (
        <div>
            <Formik
                initialValues={{
                    country: 'CA'
                }}
                validate={()=>{ return {}; }}
                onSubmit={()=>{}}
                render={form}
            />
        </div>
    );
};

Examples.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired
};

export default injectIntl(withStyles(styles)(Examples));
