import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import {qtyEncode, qtyDecode} from '../lib/qty';

const QuantityTextField = (props) => {
    // ignore schema in ...rest
    const {value, unit, base, ...rest} = props;

    return (
        <TextField
            step="any"  // allow override
            {...rest}
            type="number"
            value={qtyDecode(unit, base)(value)}
            clean={qtyEncode(unit, base)}
            endAdornment={
                <InputAdornment position="end">
                    {unit}
                </InputAdornment>
            }
        />
    );
};

QuantityTextField.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number
};

export default QuantityTextField;
