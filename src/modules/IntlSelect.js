import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from 'material-ui/styles';

import {merge} from 'lodash';
import {makeLabel} from './lib/label';

// input elements
import { FormControl, FormHelperText } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';

import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const styles = () => ({
    iconEnabled: {
        display: 'block'
    },
    iconDisabled: {
        display: 'none'
    }
});

const IntlSelect = (props) => {
    let {
        classes, intl,
        name,                           // id
        schema, touched, value, error,  // formik values
        label, helperText,              // intl ids
        labelIntl, helperTextIntl,
        onChange, sort, ...rest                         // styling & callbacks
    } = props;

    const handleChange = (event) => {
        event.target.name = name;   // not passed back from material-ui component
        event.persist = () => {}; // workaround for bug in formnik TODO submit PR #179
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


    const optionSort = (a,b) => {
        if (!sort) return 0;    // don't sort
        const aIntl = intl.formatMessage({ id: `field.${name}.option.${a}` });
        const bIntl = intl.formatMessage({ id: `field.${name}.option.${b}` });
        return (aIntl > bIntl) ? 1 : ((aIntl < bIntl) ? -1 : 0);    // eslint-disable-line no-nested-ternary
    };

    //console.log('IntlSelect.render()', name, value, rest.disabled);

    return (
        <FormControl
            {...rest}
            error={hasError}
            id={`${name}Control`}
        >
            {labelIntl && <InputLabel htmlFor={name}>{labelIntl}</InputLabel>}
            <Select
                {...rest}
                name={name}
                value={value || ''}
                input={<Input name={name}/>}
                onChange={handleChange}
                classes={{
                    icon: rest.disabled ? classes.iconDisabled : classes.iconEnabled
                }}
            >
                {schema.enum.sort(optionSort).map((option, idx) =>
                    (<MenuItem key={`${name}-${idx}-${option}`}
                        value={option}>{intl.formatMessage({ id: `field.${name}.option.${option}` })}</MenuItem>)
                )}
            </Select>
            {helperTextIntl && <FormHelperText>{helperTextIntl}</FormHelperText>}
        </FormControl>
    );
};

IntlSelect.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    sort: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
    touched: PropTypes.bool,
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

export default injectIntl(withStyles(styles)(IntlSelect));
