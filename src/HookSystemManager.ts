import {HookSystemStatus} from "./Constants";
import * as React from "react";

class ReactHookFactoryManager {
    constructor(){

    }

    private status: HookSystemStatus = HookSystemStatus.dormant;

    public Provider = ({ onReady, children }) => {

        const [initiated, setinitiated] = React.useState(false);
        const [firstRun, setFirstRun] = React.useState(true);

        // const [hookState, setHookState] = React.useState({ version: 0 });
        const [state, setState]: [Istate, any] = React.useState(null);

        const [dstate, dispatch] = React.useReducer(reducer, null);

        const loadData = React.useCallback(
            async (fonts) => {
                Styler(fonts);
                var results = await initialization();
                dispatch([reducerEvent.initialization, results]);
            },
            [dispatch],
        );

        const [fonts] = Font.useFonts({
            BlackFont: require('../../../assets/fonts/PublicSans-Black.ttf'),
            LightFont: require('../../../assets/fonts/PublicSans-Light.ttf'),
            BoldFont: require('../../../assets/fonts/PublicSans-Bold.ttf'),
            RegularFont: require('../../../assets/fonts/PublicSans-Regular.ttf'),
        });

        if (initiated === false && fonts) {
            setinitiated(true);
            loadData(fonts);
        }

        React.useEffect(() => {
            if (
                dstate !== null &&
                (state === null || state.version !== dstate.version)
            ) {
                setState(dstate);
            }
        }, [state, dstate, setState]);

        const offSpring =
            state === null || !fonts ? (
                <View />
            ) : (
                <ErrorHandler>{children}</ErrorHandler>
            );

        if (state !== null) {
            var results = getServiceUpdates();
            //
            if (results !== null) {
                dispatch([reducerEvent.serviceNotifications, results]);
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

        return (
            <HookContext.Provider value={{ state, dispatch }}>
        {offSpring}
        </HookContext.Provider>
    );



    };

    export default HookFluxSystem;

    const Initializer = () => {
        return (
            <HookSystem onReady={loaded}>
                <App />
                </HookSystem>
        );
    };
    export default Initializer;

    const loaded = () => {};



}
