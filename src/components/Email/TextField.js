import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../IntlTextField';

import {encode as encodeEmail, decode as decodeEmail} from '../lib/email';

const TextField = (props) => {
    // ignore schema in ...rest
    const {...rest} = props;
    let {value} = props;

    return (
        <IntlTextField
            {...rest}
            value={decodeEmail(value)}
            clean={encodeEmail}
            lowercase
        />
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default TextField;
