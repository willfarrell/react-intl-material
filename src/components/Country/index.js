import React from 'react';
import PropTypes from 'prop-types';

import IntlSelect from '../Select';

const Select = (props) => {
    const {...rest} = props;

    return (
        <IntlSelect
            {...rest}
            sort
        />
    );
};


Select.propTypes = {};

export default Select;
