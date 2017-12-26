import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';

const CountrySelect = (props) => {
    const {...rest} = props;

    return (
        <Select
            {...rest}
            sort
        />
    );
};


CountrySelect.propTypes = {};

export default CountrySelect;
