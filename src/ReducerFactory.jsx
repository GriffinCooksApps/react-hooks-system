"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorReducer_1 = require("./defaults/ErrorReducer");
exports.ReducerFactory = function (reducerList, errorReducer, defaultReducer) {
    if (errorReducer === void 0) { errorReducer = ErrorReducer_1.systemDefaultErrorReducer; }
    if (defaultReducer === void 0) { defaultReducer = systemDefaultReducer; }
    if (reducerList === null && defaultReducer === null)
        throw new Error('either reducerlist must be defined or the default reducer (or both)');
    var fMap = new Map();
    if (typeof reducerList === 'object' && reducerList !== null) {
        if (Array.isArray(reducerList)) {
            reducerList.forEach(function (value) {
                fMap.set(value[0], value[1]);
            });
        }
        else if (reducerList instanceof Map) {
            fMap = reducerList;
        }
    }
    else {
        Object.keys(reducerList).forEach(function (key) {
            fMap.set(key, reducerList[key]);
        });
    }
    var funMap = fMap;
    return function (state, events) {
        try {
            var newState_1 = Object.assign({}, state);
            var changed_1 = false;
            events.forEach(function (event) {
                var results;
                if (event instanceof Error) {
                    results = errorReducer(newState_1, event);
                }
                else if (Array.isArray(event)) {
                    var key_1 = event[0], payload_1 = event[1];
                    if (!funMap.get(key_1))
                        results = defaultReducer(newState_1, key_1, payload_1);
                }
                else {
                    results = defaultReducer(state, event);
                }
                if (results instanceof Error) {
                    results = errorReducer(newState_1, results);
                }
                if (results === null) {
                }
                if (results) {
                    changed_1 = true;
                    newState_1 = results;
                }
            });
            return newState_1;
        }
        catch (e) {
        }
        var _a = payload, key = _a[0], payload = _a[1];
        //
        if (state == null) {
            if (key === reducerEvent.initialization && typeof payload === 'object') {
                payload.version = 1;
                return payload;
            }
            else {
                return null;
            }
        }
        var newState = Object.assign({}, state);
        //
        newState = funMap[key](newState, payload) || null;
        if (newState === null) {
            systemErrorHandler('Error: new State null', 'base reducer', errorFlags.GeneralError);
            //
            systemErrorHandler(new ReducerError('Reducer Event returned a null or undefined object.'), 'Reducer.tsx(newState=== null)', errorFlags.configurationError);
            return Object.assign({}, state);
        }
        if (newState instanceof Error) {
            newState = Object.assign(state, { error: newState });
            systemErrorHandler('Error: ' + newState.message, 'base reducer', errorFlags.GeneralError);
        }
        var version = newState.version + 1;
        newState.version = version;
        return newState;
    };
    try { }
    catch (e) {
        systemErrorHandler('Error: ' + e.message, 'baseReducer', errorFlags.critical);
        return Object.assign({}, state);
    }
};
