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

var _masks = require('./masks.json');

var _masks2 = _interopRequireDefault(_masks);

var _schema = require('./schema.json');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Convert back to E.164
var clean = function clean(value) {
    return value.replace(/[A-C]/g, '2').replace(/[D-F]/g, '3').replace(/[G-I]/g, '4').replace(/[J-L]/g, '5').replace(/[M-O]/g, '6').replace(/[P-S]/g, '7').replace(/[T-V]/g, '8').replace(/[W-Z]/g, '9').replace(/[^0-9+]/g, '');
};

var TextField = function TextField(props) {
    // ignore schema in ...rest
    var country = props.country,
        rest = _objectWithoutProperties(props, ['country']);

    var fieldMasks = [_masks2.default[country].arr.map(function (item) {
        return item.substr(0, 1) !== '/' ? item : new RegExp(item.replace(/\//g, ''));
    })];

    return _react2.default.createElement(_TextField2.default, _extends({}, rest, {
        schema: _schema2.default,
        type: 'tel',
        masks: fieldMasks,
        clean: clean,
        placeholderIntl: _masks2.default[country].str,
        helperTextIntl: _masks2.default[country].str,
        uppercase: true
    }));
};

TextField.propTypes = {
    onChange: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.string,
    country: _propTypes2.default.string.isRequired
};

exports.default = TextField;