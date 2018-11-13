import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {merge} from 'lodash';
import {makeHasError, makeHelperText, makeLabel, makePlaceholder} from './lib/label';

// input elements
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';

const IntlSwitch = (props) => {
    let {
        intl,
        name,                           // id
        schema, touched, value, error,  // formik values
        label, helperText,   // intl ids
        labelIntl, errorIntl, helperTextIntl,
        onChange, ...rest       // styling & callbacks
    } = props;

    const handleChange = (event, checked) => {
        event.target.value = checked;
        onChange(event);
    };

    if (schema && schema.anyOf && schema.anyOf.length) {
        merge(schema, schema.anyOf[0]);
    }

    const helperTextValues = { value, ...schema };

    const hasError = makeHasError(props);
    labelIntl = makeLabel(props);
    helperTextIntl = makeHelperText(props, helperTextValues);

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
    touched: PropTypes.bool,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    errorIntl: PropTypes.string,
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
