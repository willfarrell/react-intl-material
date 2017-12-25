import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../TextField';

import masks from './masks.json';
import schema from './schema.json';

// Convert back to E.164
const clean = (value) => value
    .replace(/[A-C]/g, '2')
    .replace(/[D-F]/g, '3')
    .replace(/[G-I]/g, '4')
    .replace(/[J-L]/g, '5')
    .replace(/[M-O]/g, '6')
    .replace(/[P-S]/g, '7')
    .replace(/[T-V]/g, '8')
    .replace(/[W-Z]/g, '9')
    .replace(/[^0-9+]/g, '');

const TextField = (props) => {
    // ignore schema in ...rest
    const {country, ...rest} = props;

    const fieldMasks = [masks[country].arr.map((item) => (item.substr(0, 1) !== '/') ? item : new RegExp(item.replace(/\//g, '')))];

    return (
        <IntlTextField
            {...rest}
            schema={schema}
            type="tel"
            masks={fieldMasks}
            clean={clean}
            placeholderIntl={masks[country].str}
            helperTextIntl={masks[country].str}
            uppercase
        />
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    country: PropTypes.string.isRequired
};

export default TextField;
