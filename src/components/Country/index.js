import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';

const CountrySelect = (props) => {
    const {name, onChange, ...rest} = props;

    const handleChange = (event) => {
        event.target.name = name;
        onChange(event);
    };

    return (
        <Select
            {...rest}
            name={`country`}
            onChange={handleChange}
            sort
        />
    );
};


CountrySelect.propTypes = {};

export default CountrySelect;
