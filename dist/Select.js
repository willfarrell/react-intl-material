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

var _styles = require('material-ui/styles');

var _lodash = require('lodash');

var _label = require('./lib/label');

var _Form = require('material-ui/Form');

var _Input = require('material-ui/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('material-ui/Select');

var _Select2 = _interopRequireDefault(_Select);

var _Menu = require('material-ui/Menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// input elements


var styles = function styles() {
    return {
        iconEnabled: {
            display: 'block'
        },
        iconDisabled: {
            display: 'none'
        }
    };
};

var IntlSelect = function IntlSelect(props) {
    var classes = props.classes,
        intl = props.intl,
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
        sort = props.sort,
        rest = _objectWithoutProperties(props, ['classes', 'intl', 'name', 'schema', 'touched', 'value', 'error', 'label', 'helperText', 'labelIntl', 'helperTextIntl', 'onChange', 'sort']);

    var handleChange = function handleChange(event) {
        event.target.name = name; // not passed back from material-ui component
        event.persist = function () {}; // workaround for bug in formnik TODO submit PR #179
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

    var optionSort = function optionSort(a, b) {
        if (!sort) return 0; // don't sort
        var aIntl = intl.formatMessage({ id: 'field.' + name + '.option.' + a });
        var bIntl = intl.formatMessage({ id: 'field.' + name + '.option.' + b });
        return aIntl > bIntl ? 1 : aIntl < bIntl ? -1 : 0; // eslint-disable-line no-nested-ternary
    };

    //console.log('IntlSelect.render()', name, value, rest.disabled);

    return _react2.default.createElement(
        _Form.FormControl,
        _extends({}, rest, {
            error: hasError,
            id: name + 'Control'
        }),
        labelIntl && _react2.default.createElement(
            _Input.InputLabel,
            { htmlFor: name },
            labelIntl
        ),
        _react2.default.createElement(
            _Select2.default,
            _extends({}, rest, {
                name: name,
                value: value || '',
                input: _react2.default.createElement(_Input2.default, { name: name }),
                onChange: handleChange,
                classes: {
                    icon: rest.disabled ? classes.iconDisabled : classes.iconEnabled
                }
            }),
            schema.enum.sort(optionSort).map(function (option, idx) {
                return _react2.default.createElement(
                    _Menu.MenuItem,
                    { key: name + '-' + idx + '-' + option,
                        value: option },
                    intl.formatMessage({ id: 'field.' + name + '.option.' + option })
                );
            })
        ),
        helperTextIntl && _react2.default.createElement(
            _Form.FormHelperText,
            null,
            helperTextIntl
        )
    );
};

IntlSelect.propTypes = {
    classes: _propTypes2.default.object.isRequired,
    intl: _reactIntl.intlShape.isRequired,
    schema: _propTypes2.default.object.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    name: _propTypes2.default.string.isRequired,
    sort: _propTypes2.default.bool,
    value: _propTypes2.default.string,
    error: _propTypes2.default.string,
    touched: _propTypes2.default.bool,
    label: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    labelIntl: _propTypes2.default.string,
    helperText: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.bool]),
    helperTextIntl: _propTypes2.default.string
};

exports.default = (0, _reactIntl.injectIntl)((0, _styles.withStyles)(styles)(IntlSelect));