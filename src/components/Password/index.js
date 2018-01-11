import React from 'react';
import PropTypes from 'prop-types';

import TextField from '../TextField';
import IconButton from 'material-ui/IconButton';
import { InputAdornment } from 'material-ui/Input';

import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';

class PasswordTextField extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            showPassword: false
        };

        this.handleMouseDownPassword = (event) => {
            event.preventDefault();
        };

        this.handleClickShowPasssword = () => {
            this.setState({ showPassword: !this.state.showPassword });
        };
    }

    render() {
        const {...rest} = this.props;

        return (
            <TextField
                {...rest}
                type={this.state.showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            onClick={this.handleClickShowPasssword}
                            onMouseDown={this.handleMouseDownPassword}
                        >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
            />
        );
    }

}

PasswordTextField.propTypes = {
    name: PropTypes.string.isRequired,
};

export default PasswordTextField;
