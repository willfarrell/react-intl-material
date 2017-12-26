import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../TextField';

import {urlEncode, urlDecode} from '../lib/url';

const UrlTextField = (props) => {
    // ignore schema in ...rest
    const {...rest} = props;
    let {value} = props;

    return (
        <TextField
            {...rest}
            value={urlDecode(value)}
            clean={urlEncode}
            lowercase
        />
    );
};

UrlTextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default UrlTextField;
