"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Context_1 = require("./Context");
var ReducerFactory_1 = require("./ReducerFactory");
exports.HookFluxSystem = function (_a) {
    var _b = _a.loadingScreen, loadingScreen = _b === void 0 ? null : _b, children = _a.children, _c = _a.reducerList, reducerList = _c === void 0 ? null : _c, _d = _a.initializer, initializer = _d === void 0 ? null : _d, _e = _a.ready, ready = _e === void 0 ? true : _e, _f = _a.defaultReducer, defaultReducer = _f === void 0 ? null : _f, _g = _a.errorReducer, errorReducer = _g === void 0 ? null : _g;
    var reducer = React.useState(ReducerFactory_1.ReducerFactory(reducerList, defaultReducer, errorReducer))[0];
    React.useEffect(function () {
        reducer.updateReducer(reducerList);
    }, [reducerList]);
    var _h = React.useReducer(reducer, null), state = _h[0], dispatch = _h[1];
    React.useEffect(function () {
        if (ready) {
            darkSide.checkUpdates(state, dispatch, initializer);
        }
    });
    if (state === null) {
        return { loadingScreen: loadingScreen };
    }
    var dispatcher = darkside.dispatcher;
    return (<ErrorBoundary dispatcher={dispatcher}>
			<Context_1.HookContext.Provider value={{ state: state, dispatcher: dispatcher }} {...children}></Context_1.HookContext.Provider>
		</ErrorBoundary>);
};
