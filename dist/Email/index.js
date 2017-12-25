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

var _email = require('../lib/email');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var TextField = function TextField(props) {
    // ignore schema in ...rest
    var rest = _objectWithoutProperties(props, []);

    var value = props.value;


    return _react2.default.createElement(_TextField2.default, _extends({}, rest, {
        value: (0, _email.emailDecode)(value),
        clean: _email.emailEncode,
        lowercase: true
    }));
};

TextField.propTypes = {
    onChange: _propTypes2.default.func.isRequired,
    value: _propTypes2.default.string
};

exports.default = TextField;