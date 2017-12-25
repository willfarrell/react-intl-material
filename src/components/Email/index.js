import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../TextField';

import {emailEncode, emailDecode} from '../lib/email';

const TextField = (props) => {
    // ignore schema in ...rest
    const {...rest} = props;
    let {value} = props;

    return (
        <IntlTextField
            {...rest}
            value={emailDecode(value)}
            clean={emailEncode}
            lowercase
        />
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default TextField;
