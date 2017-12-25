'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require('material-ui/styles');

var _reactIntl = require('react-intl');

var _lodash = require('lodash');

var _textMaskCore = require('text-mask-core');

var _label = require('./lib/label');

var _Input = require('material-ui/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Form = require('material-ui/Form');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// input elements


// use when pulling form jsonschema
//export const regexMask = (mask) => mask.map((str, idx) => (str.substr(0,1) === '/' && str.substr(-1,1) === '/') ? RegExp(str.substr(1,str.length-2) : str);

var styles = function styles(theme) {
    //console.log(theme);
    return {
        shell: {
            position: 'relative'
            //lineHeight: '1'
        },
        placeholder: { // TODO find to match with placeholder
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

var IntlTextField = function IntlTextField(props) {
    // onChange not used, but should not be included in ...rest
    var classes = props.classes,
        intl = props.intl,
        name = props.name,
        schema = props.schema,
        touched = props.touched,
        value = props.value,
        error = props.error,
        label = props.label,
        placeholder = props.placeholder,
        helperText = props.helperText,
        labelIntl = props.labelIntl,
        placeholderIntl = props.placeholderIntl,
        helperTextIntl = props.helperTextIntl,
        masks = props.masks,
        placeholders = props.placeholders,
        placeholderIntls = props.placeholderIntls,
        lowercase = props.lowercase,
        uppercase = props.uppercase,
        clean = props.clean,
        onChange = props.onChange,
        rest = _objectWithoutProperties(props, ['classes', 'intl', 'name', 'schema', 'touched', 'value', 'error', 'label', 'placeholder', 'helperText', 'labelIntl', 'placeholderIntl', 'helperTextIntl', 'masks', 'placeholders', 'placeholderIntls', 'lowercase', 'uppercase', 'clean', 'onChange']);

    var inputValue = value;
    var masksIndex = 0;

    var handleMask = function handleMask(value) {
        if (!masks) {
            return value;
        }

        var conformedValue = '';

        masks.forEach(function (mask, idx) {
            var prefixLength = mask.length;
            mask.forEach(function (item, idx) {
                if (typeof item !== 'string') {
                    prefixLength = Math.min(prefixLength, idx);
                }
            });

            var tmpConformedValue = (0, _textMaskCore.conformToMask)(value, mask, {
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

    var handleChange = function handleChange(event) {
        if (lowercase) {
            event.target.value = event.target.value.toLowerCase();
        }
        if (uppercase) {
            event.target.value = event.target.value.toUpperCase();
        }

        event.target.value = handleMask(event.target.value);

        if (clean) {
            event.target.value = clean(event.target.value);
        }

        return onChange(event);
    };

    // End masking

    var hasError = touched && !!error;

    if (schema && schema.anyOf && schema.anyOf.length) {
        (0, _lodash.merge)(schema, schema.anyOf[0]);
    }

    var helperTextValues = _extends({ value: value }, schema);

    labelIntl = labelIntl || (0, _label.makeLabel)('label', intl, name, label);

    placeholderIntl = placeholderIntl || (0, _label.makeLabel)('placeholder', intl, name, placeholder);

    helperTextIntl = hasError && intl.formatMessage({ id: error }, helperTextValues) || // override with error
    helperTextIntl || (0, _label.makeLabel)('helperText', intl, name, helperText, helperTextValues);

    // masking
    inputValue = handleMask(value);

    // punycode
    if (['email', 'url'].indexOf(props.type) !== -1) {}

    if (masks && placeholderIntls && placeholderIntls.length) {
        placeholderIntl = placeholderIntls[masksIndex] || (0, _label.makeLabel)(intl, name, placeholders[masksIndex]);
    }

    //console.log('IntlTextField.render()', name, value, masks, inputValue);

    return _react2.default.createElement(
        'div',
        { className: classes.shell },
        masks && value && _react2.default.createElement(
            'span',
            { 'aria-hidden': 'true', className: classes.placeholder },
            _react2.default.createElement(
                'span',
                {
                    className: classes.value },
                inputValue
            ),
            placeholderIntl.substr(inputValue.length)
        ),
        _react2.default.createElement(
            _Form.FormControl,
            _extends({}, rest, {
                error: hasError
            }),
            labelIntl && _react2.default.createElement(
                _Input.InputLabel,
                { htmlFor: name },
                labelIntl
            ),
            _react2.default.createElement(_Input2.default, _extends({}, rest, {
                name: name,
                value: inputValue || '',
                placeholder: placeholderIntl,
                onChange: handleChange
            })),
            helperTextIntl && _react2.default.createElement(
                _Form.FormHelperText,
                null,
                helperTextIntl
            )
        )
    );
};

IntlTextField.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    intl: _reactIntl.intlShape.isRequired,
    name: _propTypes2.default.string.isRequired,
    schema: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.string,
    error: _propTypes2.default.string,
    touched: _propTypes2.default.bool,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    labelIntl: _propTypes2.default.string,
    placeholder: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    placeholderIntl: _propTypes2.default.string,
    helperText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    helperTextIntl: _propTypes2.default.string,
    masks: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.bool]),
    placeholders: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.bool]),
    placeholderIntls: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.bool]),
    lowercase: _propTypes2.default.bool,
    uppercase: _propTypes2.default.bool,
    clean: _propTypes2.default.func
};

exports.default = (0, _reactIntl.injectIntl)((0, _styles.withStyles)(styles)(IntlTextField));