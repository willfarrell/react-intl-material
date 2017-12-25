'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emailDecode = exports.emailEncode = undefined;

var _idnaUts = require('idna-uts46');

var _idnaUts2 = _interopRequireDefault(_idnaUts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailEncode = exports.emailEncode = function emailEncode(value) {
    return _idnaUts2.default.toAscii(value, { transitional: false });
};

var emailDecode = exports.emailDecode = function emailDecode(value) {
    if (value) {
        var parts = value.split('@');
        if (parts.length === 2) {
            parts[1] = _idnaUts2.default.toUnicode(parts[1]);
        }
        value = parts.join('@');
    }
    return value;
};