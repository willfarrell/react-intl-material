import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import {injectIntl, intlShape} from 'react-intl';

import {merge} from 'lodash';

import {conformToMask} from 'text-mask-core';
import {makeHasError, makeLabel, makePlaceholder, makeHelperText} from './lib/label';

// input elements
import Input, {InputLabel} from 'material-ui/Input';
import {FormControl, FormHelperText} from 'material-ui/Form';

// use when pulling form jsonschema
//export const regexMask = (mask) => mask.map((str, idx) => (str.substr(0,1) === '/' && str.substr(-1,1) === '/') ? RegExp(str.substr(1,str.length-2) : str);

const styles = (theme) => {
    //console.log(theme);
    return {
        shell: {
            position: 'relative'
            //lineHeight: '1'
        },
        placeholder: {  // TODO find to match with placeholder
            position: 'absolute',
            top: '1.45rem',
            pointerEvents: 'none',

            color: theme.palette.common.lightBlack,
            fontFamily: theme.typography.fontFamily,
            fontSize: '16px',
            fontWeight: theme.typography.fontWeightRegular
        },
        value: {
            fontStyle: 'normal',
            opacity: 0
        }
    };
};

const IntlTextField = (props) => {
    // onChange not used, but should not be included in ...rest
    let {
        classes, intl,
        name,                                   // id
        schema, touched, value, error,          // formik values
        label, placeholder, helperText,         // intl ids
        labelIntl, errorIntl, placeholderIntl, helperTextIntl,  // require let
        masks, placeholders, placeholderIntls,
        lowercase, uppercase, clean, onChange,
        startAdornment, endAdornment, ...rest  // styling & callbacks
    } = props;

    let inputValue = value;
    let masksIndex = 0;

    const handleMask = (value) => {
        if (!masks) { return value; }

        let conformedValue = '';

        masks.forEach((mask, idx) => {
            let prefixLength = mask.length;
            mask.forEach((item, idx) => {
                if (typeof item !== 'string') {
                    prefixLength = Math.min(prefixLength, idx);
                }
            });

            let tmpConformedValue = conformToMask(value, mask, {
                guide: false,
                previousConformedValue: inputValue
            }).conformedValue;

            if (prefixLength === mask.length) {
                // Auto populate when only one permutation
                tmpConformedValue = mask.join('');
            } else if (tmpConformedValue.length <= prefixLength) {
                // clear static prefix when value equals it
                tmpConformedValue = '';
            }

            if (conformedValue.length < tmpConformedValue.length) {
                conformedValue = tmpConformedValue;
                masksIndex = idx;
            }
        });

        return conformedValue;
    };

    const handleChange = (event) => {
        if (lowercase) {
            event.target.value = event.target.value.toLowerCase()
        }
        if (uppercase) {
            event.target.value = event.target.value.toUpperCase()
        }

        event.target.value = handleMask(event.target.value);

        if (!!clean) {
            event.target.value = clean(event.target.value);
        }

        return onChange(event);
    };

    // End masking



    if (schema && schema.anyOf && schema.anyOf.length) {
        merge(schema, schema.anyOf[0]);
    }

    const helperTextValues = { value, ...schema };

    const hasError = makeHasError(props);
    labelIntl = makeLabel(props);
    placeholderIntl = makePlaceholder(props);
    helperTextIntl = makeHelperText(props, helperTextValues);

    // masking
    inputValue = handleMask(value);


    if (masks && placeholderIntls && placeholderIntls.length) {
        placeholderIntl = placeholderIntls[masksIndex]
            || makeLabel(intl, name, placeholders[masksIndex]);
    }

    //console.log('IntlTextField.render()', name, value, masks, inputValue);

    return (
        <div className={classes.shell}>
            {masks && value && <span aria-hidden="true" className={classes.placeholder}><span
                className={classes.value}>{inputValue}</span>{placeholderIntl.substr(inputValue.length)}</span>}
            <FormControl
                {...rest}
                error={hasError}
            >
                {labelIntl && <InputLabel htmlFor={name}>{labelIntl}</InputLabel>}
                <Input
                    {...rest}
                    name={name}
                    value={inputValue || ''}
                    placeholder={placeholderIntl}
                    onChange={handleChange}
                    startAdornment={startAdornment}
                    endAdornment={endAdornment}
                />

                {helperTextIntl && <FormHelperText>{helperTextIntl}</FormHelperText>}
            </FormControl>
        </div>
    );
};

IntlTextField.propTypes = {
    classes: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    name: PropTypes.string.isRequired,
    schema: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
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
    placeholder: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    placeholderIntl: PropTypes.string,
    helperText: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool
    ]),
    helperTextIntl: PropTypes.string,
    masks: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool
    ]),
    placeholders: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool
    ]),
    placeholderIntls: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.bool
    ]),
    lowercase: PropTypes.bool,
    uppercase: PropTypes.bool,
    clean: PropTypes.func,
    startAdornment: PropTypes.element,
    endAdornment: PropTypes.element,
};

IntlTextField.defaultProps = {
    schema: {},
};

export default injectIntl(withStyles(styles)(IntlTextField));
