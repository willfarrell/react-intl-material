"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var makeLabel = exports.makeLabel = function makeLabel(type, intl, name, str) {
    var values = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    return str === true && intl.formatMessage({ id: "field." + name + "." + type }, values) || // use default
    !!str && intl.formatMessage({ id: str }, values) // use custom id
    || str; // use fallback
};