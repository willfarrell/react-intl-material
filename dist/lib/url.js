'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.decode = exports.encode = undefined;

var _idnaUts = require('idna-uts46');

var _idnaUts2 = _interopRequireDefault(_idnaUts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 0: protocol, 1: hostanme, 2: querystring
var parse = function parse(str) {
    var urlParts = /^(\w+:\/\/)?([^\/]+)(.*)$/.exec(str);
    urlParts.shift();
    return urlParts;
};

var encode = exports.encode = function encode(value) {
    var urlParts = parse(value);
    if (urlParts[1] !== '') {
        urlParts[1] = _idnaUts2.default.toAscii(urlParts[1], { transitional: false });
    }
    return encodeURI(urlParts.join(''));
};

var decode = exports.decode = function decode(value) {
    if (value) {
        var urlParts = parse(value);
        if (urlParts[1] !== '') {
            urlParts[1] = _idnaUts2.default.toUnicode(urlParts[1]);
        }
        value = decodeURI(urlParts.join(''));
    }
    return value;
};