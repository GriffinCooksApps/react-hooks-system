"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var hookSystemManager = new HookSystemManager();
exports.HookContext = React.createContext({
    state: {},
    dispatch: hookSystemManager,
});
var HookSystemStatus;
(function (HookSystemStatus) {
    HookSystemStatus[HookSystemStatus["dormant"] = 0] = "dormant";
    HookSystemStatus[HookSystemStatus["loading"] = 1] = "loading";
    HookSystemStatus[HookSystemStatus["loaded"] = 2] = "loaded";
    HookSystemStatus[HookSystemStatus["ready"] = 3] = "ready";
    HookSystemStatus[HookSystemStatus["inError"] = 4] = "inError";
    HookSystemStatus[HookSystemStatus["recovered"] = 5] = "recovered";
    HookSystemStatus[HookSystemStatus["failed"] = 6] = "failed";
})(HookSystemStatus = exports.HookSystemStatus || (exports.HookSystemStatus = {}));
