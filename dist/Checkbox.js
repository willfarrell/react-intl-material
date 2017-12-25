'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactIntl = require('react-intl');

var _lodash = require('lodash');

var _label = require('./lib/label');

var _Form = require('material-ui/Form');

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// input elements


var IntlCheckbox = function IntlCheckbox(props) {
    var intl = props.intl,
        name = props.name,
        schema = props.schema,
        touched = props.touched,
        value = props.value,
        error = props.error,
        label = props.label,
        helperText = props.helperText,
        labelIntl = props.labelIntl,
        helperTextIntl = props.helperTextIntl,
        onChange = props.onChange,
        rest = _objectWithoutProperties(props, ['intl', 'name', 'schema', 'touched', 'value', 'error', 'label', 'helperText', 'labelIntl', 'helperTextIntl', 'onChange']);

    var handleChange = function handleChange(event, checked) {
        event.target.value = checked;
        onChange(event);
    };

    var hasError = touched && !!error;

    if (schema && schema.anyOf && schema.anyOf.length) {
        (0, _lodash.merge)(schema, schema.anyOf[0]);
    }

    var helperTextValues = _extends({ value: value }, schema);

    labelIntl = labelIntl || (0, _label.makeLabel)('label', intl, name, label);

    helperTextIntl = hasError && intl.formatMessage({ id: error }, helperTextValues) || // override with error
    helperTextIntl || (0, _label.makeLabel)('helperText', intl, name, helperText, helperTextValues);

    //console.log('IntlCheckbox.render()', name, value);

    return _react2.default.createElement(
        _Form.FormControl,
        null,
        _react2.default.createElement(_Form.FormControlLabel, {
            label: labelIntl,
            control: _react2.default.createElement(_Checkbox2.default, _extends({}, rest, {
                name: name,
                checked: !!value,
                onChange: handleChange
            })),
            style: { maxWidth: '600px' } // IE 11 hack
        }),
        helperTextIntl && _react2.default.createElement(
            _Form.FormHelperText,
            { style: { marginLeft: '4.8rem' } },
            helperTextIntl
        )
    );
};

IntlCheckbox.propTypes = {
    intl: _reactIntl.intlShape.isRequired,
    schema: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.bool,
    error: _propTypes2.default.string,
    touched: _propTypes2.default.bool,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    labelIntl: _propTypes2.default.string,
    helperText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    helperTextIntl: _propTypes2.default.string
};

IntlCheckbox.defaultProps = {
    error: '',
    touched: false,
    label: false,
    helperText: false
};

exports.default = (0, _reactIntl.injectIntl)(IntlCheckbox);