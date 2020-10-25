"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var simpleReducer = function (state, payload) {
    // @ts-ignore
    return Object.assign({}, state, payload);
};
var Provider = function (_a) {
    var onReady = _a.onReady, children = _a.children;
    var _b = React.useReducer(simpleReducer, {}), state = _b[0], reducer = _b[1];
};
exports.default = Provider;
