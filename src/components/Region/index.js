import React from 'react';
import PropTypes from 'prop-types';

import IntlSelect from '../Select';

import regionSchema from './schema.json';

const Select = (props) => {

    const {name, country, onChange, ...rest} = props;

    const handleChange = (event) => {
        event.target.name = name;
        onChange(event);
    };

    // TODO add in label & placeholder logic
    // TODO catch use case for country `IO` - replace w/ string `N/A`
    return (
        <div>
            <IntlSelect
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


Select.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    country: PropTypes.string.isRequired
};

export default Select;
