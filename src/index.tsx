import React from 'react';
import { reducerEvent } from '../../domains/reducerEvents';
import { getServiceUpdates } from '../DarkSide/services';
import { initialization } from '../../domains/initialization';
import { Istate } from '../../domains/index';
import { reducer } from '../../domains/Reducer';
import { Styler } from '../../../styles/Styler';
import * as Font from 'expo-font';
import { View } from 'react-native';
import { HookContext } from '../Context';
import { ErrorHandler } from '../../error/ErrorHandler';

const HookSystem = ({ onReady, children }) => {
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

export default HookSystem;
import * as React from 'react';
import App from './App';
import { enableScreens } from 'react-native-screens';
import HookSystem from './system/HookSystem/HookSystem';

enableScreens();
const Initializer = () => {
  return (
    <HookSystem onReady={loaded}>
      <App />
    </HookSystem>
  );
};
export default Initializer;

const loaded = () => {};
