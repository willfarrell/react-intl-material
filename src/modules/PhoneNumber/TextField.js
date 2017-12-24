import React from 'react';
import PropTypes from 'prop-types';

import IntlTextField from '../IntlTextField';

import masks from './masks.json';
import schema from './schema.json';

const TextField = (props) => {
    // ignore schema in ...rest
    const { country, ...rest } = props;

    return (
        <div>
            <IntlTextField
                {...rest}
                schema={schema}
                type="tel"
                masks={[masks[country].arr.map((item) => (item.substr(0,1) !== '/') ? item : new RegExp(item.replace(/\//g,'')) )]}
                clean={(value) => value
                    .replace(/[A-C]/g, '2')
                    .replace(/[D-F]/g, '3')
                    .replace(/[G-I]/g, '4')
                    .replace(/[J-L]/g, '5')
                    .replace(/[M-O]/g, '6')
                    .replace(/[P-S]/g, '7')
                    .replace(/[T-V]/g, '8')
                    .replace(/[W-Z]/g, '9')
                    .replace(/[^0-9+]/g, '')}   // Convert back to E.164
                placeholderIntl={masks[country].str}
                helperTextIntl={masks[country].str}
                uppercase
            />
        </div>
    );
};

TextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    country: PropTypes.string.isRequired
};

export default TextField;
