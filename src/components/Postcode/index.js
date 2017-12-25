import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../TextField';

import postcodeSchema from 'upu-postcode/dist/postcode.jsonschema.json';
import postcodeMasks from 'upu-postcode/dist/postcode.masks.json';

const TextField = (props) => {
    const {country, ...rest} = props;

    const fieldMasks = postcodeMasks[country].masks.map((mask) => mask.map((item) => (item.substr(0, 1) !== '/') ? item : new RegExp(item.replace(/\//g, ''))))

    return (
        <IntlTextField
            {...rest}
            masks={fieldMasks}
            schema={postcodeSchema.definitions[country]}
            placeholderIntls={postcodeMasks[country].placeholders}
            helperTextIntl={postcodeMasks[country].helperText}
            uppercase
        />
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired,
    value: PropTypes.string
};

export default TextField;
