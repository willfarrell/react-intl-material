import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {merge} from 'lodash';
import {makeLabel} from './lib/label';

// input elements
import { FormControl, FormGroup, FormControlLabel, FormLabel, FormHelperText } from 'material-ui/Form';
import Radio from 'material-ui/Radio';

const IntlRadioSelect = (props) => {
    let {
        intl,
        name,                           // id
        schema, touched, value, error,  // formik values
        label, helperText,              // intl ids
        labelIntl, errorIntl, helperTextIntl,
        onChange, ...rest                         // styling & callbacks
    } = props;

    const handleChange = (event) => {
        event.target.name = name;   // not passed back from material-ui component
        event.persist = () => {
        }; // workaround for bug in formnik TODO submit PR #179
        onChange(event);
    };

    const hasError = touched && !!error;

    if (schema && schema.anyOf && schema.anyOf.length) {
        merge(schema, schema.anyOf[0]);
    }

    const helperTextValues = { value, ...schema };

    labelIntl = labelIntl
        || makeLabel('label', intl, name, label);

    helperTextIntl = (hasError && error && intl.formatMessage({id: error}, helperTextValues)) // override with error
        || hasError && errorIntl
        || helperTextIntl
        || makeLabel('helperText', intl, name, helperText, helperTextValues);

    //console.log('IntlRadioSelect.render()', name, value);

    return (
        <FormControl
            id={`${name}Control`}
        >
            {labelIntl && <FormLabel focused={false}>{labelIntl}</FormLabel>}
            <FormGroup row>
                {schema.enum.map((option, idx) =>
                    (<FormControlLabel key={`${name}-${idx}-${option}`}
                        control={
                            <Radio
                                id={`${name}RadioOption${option}`}
                                checked={value === option}
                                onChange={handleChange}
                                value={option}
                                {...rest}
                            />
                        }
                        label={intl.formatMessage({ id:`field.${name}.option.${option}` })}
                    />))}
            </FormGroup>
            {helperTextIntl && <FormHelperText>{helperTextIntl}</FormHelperText>}
        </FormControl>
    );
};

IntlRadioSelect.propTypes = {
    intl: intlShape.isRequired,
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
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
    labelIntl: PropTypes.string,
    helperText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    helperTextIntl: PropTypes.string,
};

export default injectIntl(IntlRadioSelect);
