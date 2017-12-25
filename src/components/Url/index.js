import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../TextField';

import {urlEncode, urlDecode} from '../lib/url';

const TextField = (props) => {
    // ignore schema in ...rest
    const {...rest} = props;
    let {value} = props;

    return (
        <IntlTextField
            {...rest}
            value={urlDecode(value)}
            clean={urlEncode}
            lowercase
        />
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default TextField;
