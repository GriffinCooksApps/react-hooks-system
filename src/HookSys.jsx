"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var reducerEvents_1 = require("../../domains/reducerEvents");
var services_1 = require("../DarkSide/services");
var initialization_1 = require("../../domains/initialization");
var Reducer_1 = require("../../domains/Reducer");
var Styler_1 = require("../../../styles/Styler");
var Font = require("expo-font");
var react_native_1 = require("react-native");
var Context_1 = require("../Context");
var ErrorHandler_1 = require("../../error/ErrorHandler");
var HookFluxSystem = function (_a) {
    var onReady = _a.onReady, children = _a.children;
    var _b = React.useState(false), initiated = _b[0], setinitiated = _b[1];
    var _c = React.useState(true), firstRun = _c[0], setFirstRun = _c[1];
    // const [hookState, setHookState] = React.useState({ version: 0 });
    var _d = React.useState(null), state = _d[0], setState = _d[1];
    var _e = React.useReducer(Reducer_1.reducer, null), dstate = _e[0], dispatch = _e[1];
    var loadData = React.useCallback(function (fonts) { return __awaiter(_this, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Styler_1.Styler(fonts);
                    return [4 /*yield*/, initialization_1.initialization()];
                case 1:
                    results = _a.sent();
                    dispatch([reducerEvents_1.reducerEvent.initialization, results]);
                    return [2 /*return*/];
            }
        });
    }); }, [dispatch]);
    var fonts = Font.useFonts({
        BlackFont: require('../../../assets/fonts/PublicSans-Black.ttf'),
        LightFont: require('../../../assets/fonts/PublicSans-Light.ttf'),
        BoldFont: require('../../../assets/fonts/PublicSans-Bold.ttf'),
        RegularFont: require('../../../assets/fonts/PublicSans-Regular.ttf'),
    })[0];
    if (initiated === false && fonts) {
        setinitiated(true);
        loadData(fonts);
    }
    React.useEffect(function () {
        if (dstate !== null &&
            (state === null || state.version !== dstate.version)) {
            setState(dstate);
        }
    }, [state, dstate, setState]);
    var offSpring = state === null || !fonts ? (<react_native_1.View />) : (<ErrorHandler_1.ErrorHandler>{children}</ErrorHandler_1.ErrorHandler>);
    if (state !== null) {
        var results = services_1.getServiceUpdates();
        //
        if (results !== null) {
            dispatch([reducerEvents_1.reducerEvent.serviceNotifications, results]);
        }
        if (firstRun) {
            setFirstRun(false);
            onReady();
        }
    }
    // if (state && state.form) {
    //   Object.keys(state.form).forEach((key) => {
    //     let field = state.form[key];
    //     if (field != undefined && (field.value || '') != '') {
    //
    //     }
    //   });
    // }
    //?.form?.itemControlNumber, '---', state?.form?.propertyId);
    //
    //
    return (<Context_1.HookContext.Provider value={{ state: state, dispatch: dispatch }}>
            {offSpring}
        </Context_1.HookContext.Provider>);
};
exports.default = HookFluxSystem;
var Initializer = function () {
    return (<HookSystem onReady={loaded}>
            <App />
        </HookSystem>);
};
exports.default = Initializer;
var loaded = function () { };
