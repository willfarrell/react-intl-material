import React from 'react';
import PropTypes from 'prop-types';

import IntlSelect from '../IntlSelect';

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
