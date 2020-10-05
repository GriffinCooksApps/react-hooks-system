

export interface iState {
	_stateindex: number;
	[key: string]: any;
}

type tState = iState | null;

export interface iPayload{
	[key: string | number]: iReducer | iEReducer;
}

export type tPayload = Error | iPayload | [iPayload] | [[string|number, any]];

export interface iReducer {
	(state: iState, payload: any): iState;
}

export interface iEReducer {
	(state: iState, error: Error): iState;
}

export interface iMainReducer{
	(state: tState, payload: Error | iPayload): iState;
}

type tReducerArray = [[string | number, iReducer]];

interface iReducerObj {
	[key: string]: iReducer;
}

type tReducerList = tReducerArray | iReducerObj;



interface iReducerFactory {
	(reducerList: tReducerList | null,
		defaultReducer: iReducer | null,
		errorReducer: iEReducer | null,
	): iReducer;
}



export const ReducerFactory: iReducerFactory = (reducerList, defaultReducer, errorReducer) => {
	if (reducerList === null && defaultReducer === null) throw new Error('either reducerlist must be defined or the default reducer (or both)');
	const funMap = new Map();
	if (typeof reducerList === 'object' && reducerList !== null) {
		if (Array.isArray(reducerList)) {
			reducerList.forEach(value => {
				funMap.set(value[0], value[1]);
			});
		} else {
			Object.keys(reducerList).forEach(key => {
				funMap.set(key, reducerList[key]);
			})
		}
	}

	return (state, payloads:iPayloadStack) => {

		try {

			if()

		const [key, payload] = payload;
		//
		if (state == null) {
			if (key === reducerEvent.initialization && typeof payload === 'object') {
				payload.version = 1;
				return payload;
			} else {
				return null;
			}
		}

		let newState = Object.assign({}, state);
		//
		newState = funMap[key](newState, payload) || null;

		if (newState === null) {
			systemErrorHandler(
				'Error: new State null',
				'base reducer',
				errorFlags.GeneralError,
			);
			//
			systemErrorHandler(
				new ReducerError('Reducer Event returned a null or undefined object.'),
				'Reducer.tsx(newState=== null)',
				errorFlags.configurationError,
			);
			return Object.assign({}, state);
		}
		if (newState instanceof Error) {
			newState = Object.assign(state, { error: newState });
			systemErrorHandler(
				'Error: ' + newState.message,
				'base reducer',
				errorFlags.GeneralError,
			);
		}
		const version = newState.version + 1;
		newState.version = version;
		return newState;
	} catch (e) {
		systemErrorHandler(
			'Error: ' + e.message,
			'baseReducer',
			errorFlags.critical,
		);
		return Object.assign({}, state);
	}
};
