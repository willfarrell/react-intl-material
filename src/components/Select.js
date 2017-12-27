import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from 'material-ui/styles';

import {merge} from 'lodash';
import {makeHasError, makeHelperText, makeLabel, makePlaceholder} from './lib/label';

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
        labelIntl, errorIntl, helperTextIntl,
        onChange, onBlur, sort, ...rest                         // styling & callbacks
    } = props;

    const handleChange = (event) => {
        event.target.name = name;   // not passed back from material-ui component
        event.persist = () => {};   // workaround for bug in formnik TODO submit PR #179
        onChange(event);
    };

    const handleBlur = (event) => {
        event.target.name = name;   // not passed back from material-ui component
        onBlur(event);
    };


    if (schema && schema.anyOf && schema.anyOf.length) {
        merge(schema, schema.anyOf[0]);
    }

    const helperTextValues = { value, ...schema };

    const hasError = makeHasError(props);
    labelIntl = makeLabel(props);
    helperTextIntl = makeHelperText(props, helperTextValues);


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
                onBlur={handleBlur}
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

export default injectIntl(withStyles(styles)(IntlSelect));
