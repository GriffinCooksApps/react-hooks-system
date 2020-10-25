import { deepCopy } from 'lodash';
import { systemDefaultErrorReducer } from './defaults/ErrorReducer';

export interface iState {
	_stateindex: number;
	[key: string]: any;
}

type tState = iState | null;

export interface iReducer {
	(state: iState, payload?: any): iState | null | void | Error;
}

export interface iDefaultReducerKeyed {
	(state: iState, key: string | number, payload?: any): iState | null | void;
}
export interface iDefaultReducerUnkeyed {
	(state: iState, payload?: any): iState | null | void;
}

export type tDefaultReducer = iDefaultReducerKeyed | iDefaultReducerUnkeyed;



export interface iEReducer {
	(state: iState, error: Error): iState | null | void;
}

type tReducerList = [[string | number, iReducer]] | { [key: string]: iReducer; } | Map<string | number, iReducer>;

interface iReducerFactory {
	(reducerList: tReducerList | null,
		errorReducer?: iEReducer,
		defaultReducer?: tDefaultReducer,
	): iReducer;
}

type tReducerEvent = [string | number, any] | Error;
export type tEventList = tReducerEvent[];


export const ReducerFactory: iReducerFactory = (reducerList, errorReducer = systemDefaultErrorReducer, defaultReducer = systemDefaultReducer) => {
	if (reducerList === null && defaultReducer === null) throw new Error('either reducerlist must be defined or the default reducer (or both)');
	let fMap = new Map<string | number, iReducer>();
	if (typeof reducerList === 'object' && reducerList !== null) {
		if (Array.isArray(reducerList)) {
			reducerList.forEach(value => {
				fMap.set(value[0], value[1]);
			});
		} else if (reducerList instanceof Map) {
			fMap = reducerList;
		}
	} else {
		Object.keys(reducerList).forEach(key => {
			fMap.set(key, reducerList[key]);
		})
	}
	const funMap = fMap;


	return (state, events: tEventList) => {
		try {
			let newState = Object.assign({}, state);
			let changed = false;
			events.forEach(event => {
				let results;
				if (event instanceof Error) {
					results = errorReducer(newState, event);
				} else if (Array.isArray(event)) {
					let [key, payload] = event;
					if (!funMap.get(key)) results = defaultReducer(newState, key, payload);
				} else {
					results = defaultReducer(state, event);
				}
				if (results instanceof Error) {
					results = errorReducer(newState, results);
				}
				if (results === null) {
				}
				if (results) {
					changed = true;
					newState = results;
				}
			});
			return newState;
		} catch (e) {

		}

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
