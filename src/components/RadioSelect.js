import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import {merge} from 'lodash';
import {makeHasError, makeHelperText, makeLabel, makePlaceholder} from './lib/label';

// input elements
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';

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


    if (schema && schema.anyOf && schema.anyOf.length) {
        merge(schema, schema.anyOf[0]);
    }

    const helperTextValues = { value, ...schema };

    const hasError = makeHasError(props);
    labelIntl = makeLabel(props);
    helperTextIntl = makeHelperText(props, helperTextValues);

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
