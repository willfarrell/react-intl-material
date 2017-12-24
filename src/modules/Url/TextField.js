import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../IntlTextField';

import {encode as encodeUrl, decode as decodeUrl} from '../lib/url';

const TextField = (props) => {
    // ignore schema in ...rest
    const { ...rest } = props;
    let { value } = props;

    return (
        <div>
            <IntlTextField
                {...rest}
                value={decodeUrl(value)}
                clean={encodeUrl}
                lowercase
            />
        </div>
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string
};

export default TextField;
