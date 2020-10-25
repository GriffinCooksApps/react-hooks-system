import * as React from 'react';
import { initialization } from '../utility/initialization';
import { HookContext } from './Context';
import { iState, iReducer, ReducerFactory } from './ReducerFactory';










export const HookFluxSystem = ({ loadingScreen = null, children, reducerList = null, initializer = null, ready = true, defaultReducer = null, errorReducer = null }: HookFluxSystemProps) => {

	const [reducer] = React.useState(ReducerFactory(reducerList, defaultReducer, errorReducer));

	React.useEffect(() => {
		reducer.updateReducer(reducerList);
	}, [reducerList]);

	const [state, dispatch]: [tState, React.DispatchWithoutAction] = React.useReducer(reducer, null);

	React.useEffect(() => {
		if (ready) {
			darkSide.checkUpdates(state, dispatch, initializer);
		}
	});

	if (state === null) {
		return { loadingScreen };
	}


	const dispatcher = darkside.dispatcher;

	return (
		<ErrorBoundary dispatcher={dispatcher}>
			<HookContext.Provider value={{ state, dispatcher }}
				{children}
			></HookContext.Provider>
		</ErrorBoundary>
	);

}
