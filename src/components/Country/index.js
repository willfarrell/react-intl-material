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
            label={`field.${name}.label`}
            onChange={handleChange}
            sort
        />
    );
};


CountrySelect.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default CountrySelect;
