import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../TextField';

import {emailEncode, emailDecode} from '../lib/email';

const EmailTextField = (props) => {
    // ignore schema in ...rest
    const {...rest} = props;
    let {value} = props;

    return (
        <TextField
            {...rest}
            value={emailDecode(value)}
            clean={emailEncode}
            lowercase
        />
    );
};

EmailTextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default EmailTextField;
