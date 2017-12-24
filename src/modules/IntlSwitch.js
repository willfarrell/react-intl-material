import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {merge} from 'lodash';
import {makeLabel} from './lib/label';

// input elements
import { FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

const IntlSwitch = (props) => {
    let {
        intl,
        name,                           // id
        schema, touched, value, error,  // formik values
        label, helperText,   // intl ids
        labelIntl, helperTextIntl,
        onChange, ...rest       // styling & callbacks
    } = props;

    const handleChange = (event, checked) => {
        event.target.value = checked;
        onChange(event);
    };

    const hasError = touched && !!error;

    if (schema && schema.anyOf && schema.anyOf.length) {
        merge(schema, schema.anyOf[0]);
    }

    const helperTextValues = { value, ...schema };

    labelIntl = labelIntl
        || makeLabel('label', intl, name, label);

    helperTextIntl = (hasError && intl.formatMessage({id: error}, helperTextValues)) // override with error
        || helperTextIntl
        || makeLabel('helperText', intl, name, helperText, helperTextValues);

    //console.log('IntlSwitch.render()', name, value);

    return (
        <FormControl>
            <FormControlLabel
                label={labelIntl}
                control={
                    <Switch
                        {...rest}
                        name={name}
                        checked={!!value}
                        onChange={handleChange}
                    />
                }
            />
            {helperTextIntl && <FormHelperText style={{ marginLeft: '4.8rem' }}>{helperTextIntl}</FormHelperText>}
        </FormControl>
    );
};

IntlSwitch.propTypes = {
    intl: intlShape.isRequired,
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.bool,
    error: PropTypes.string,
    touched: PropTypes.bool,
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    helperText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ])
};

export default injectIntl(IntlSwitch);
