'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _TextField = require('../TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _postcodeJsonschema = require('upu-postcode/dist/postcode.jsonschema.json');

var _postcodeJsonschema2 = _interopRequireDefault(_postcodeJsonschema);

var _postcodeMasks = require('upu-postcode/dist/postcode.masks.json');

var _postcodeMasks2 = _interopRequireDefault(_postcodeMasks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextField = function TextField(props) {
    var country = props.country,
        rest = _objectWithoutProperties(props, ['country']);

    var fieldMasks = _postcodeMasks2.default[country].masks.map(function (mask) {
        return mask.map(function (item) {
            return item.substr(0, 1) !== '/' ? item : new RegExp(item.replace(/\//g, ''));
        });
    });

    return _react2.default.createElement(_TextField2.default, _extends({}, rest, {
        masks: fieldMasks,
        schema: _postcodeJsonschema2.default.definitions[country],
        placeholderIntls: _postcodeMasks2.default[country].placeholders,
        helperTextIntl: _postcodeMasks2.default[country].helperText,
        uppercase: true
    }));
};

TextField.propTypes = {
    onChange: _propTypes2.default.func.isRequired,
    country: _propTypes2.default.string.isRequired,
    value: _propTypes2.default.string
};

exports.default = TextField;