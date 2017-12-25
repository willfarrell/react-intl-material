'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Select = require('../Select');

var _Select2 = _interopRequireDefault(_Select);

var _schema = require('./schema.json');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Select = function Select(props) {
    var name = props.name,
        country = props.country,
        onChange = props.onChange,
        rest = _objectWithoutProperties(props, ['name', 'country', 'onChange']);

    var handleChange = function handleChange(event) {
        event.target.name = name;
        onChange(event);
    };

    // TODO add in label & placeholder logic
    // TODO catch use case for country `IO` - replace w/ string `N/A`
    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_Select2.default, _extends({}, rest, {
            name: 'region' + country,
            label: 'field.' + name + '.label',
            schema: _schema2.default.definitions[country],
            onChange: handleChange,
            sort: true
        }))
    );
};

Select.propTypes = {
    name: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    country: _propTypes2.default.string.isRequired
};

exports.default = Select;