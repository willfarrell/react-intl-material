import React from 'react';
import PropTypes from 'prop-types';

import Select from '../Select';

import regionSchema from './schema.json';

const RegionSelect = (props) => {

    const {name, country, onChange, ...rest} = props;

    const handleChange = (event) => {
        event.target.name = name;
        onChange(event);
    };

    // TODO add in label & placeholder logic
    // TODO catch use case for country `IO` - replace w/ string `N/A`
    return (
        <div>
            <Select
                {...rest}
                name={`region${country}`}
                label={`field.${name}.label`}
                schema={regionSchema.definitions[country]}
                onChange={handleChange}
                sort
            />
        </div>
    );
};


RegionSelect.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired
};

export default RegionSelect;
