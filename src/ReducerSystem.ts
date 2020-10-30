/** @format */


//TODO: Simplify this system to one structure.  Using the models.

import { systemDefaultErrorReducer } from './defaults/ErrorReducer';
import type { iState } from './ModelManager';
import { hookSystemStatuses } from './Constants';
import type { tDispatchEvent } from './useHookManager';

export const baseState: iState = {
	status: hookSystemStatuses.loading,
	statusIteration: 0,
	iteration: 0,
	errors: [],
};

export interface iReducer {
	(state: iState, payload: any): iState | null;
}

export interface iKeyedReducer {
	(state: iState, key: number | string, payload: any): iState | null;
}

export interface iStateFunction {
	(state: iState): iState | null;
}

export interface iErrorReducer {
	(state: iState, payload: Error): iState | null;
}

export interface iReducerSystem {
	(state: iState, eventType: tDispatchEvent, payload: any): iState;
}

export type tReducerType = iKeyedReducer | Map<string | number, iReducer> | { [key: string]: iReducer } | iReducer[];

export interface iReducerSystemFactory {
	(reducer: tReducerType, errorReducer?: iErrorReducer, defaultReducer?: iReducer): iReducerSystem;
}

const mappedReducerFactory = (map: Map<string | number, iReducer>, defaultReducer?: iReducer): iKeyedReducer => {
	return (state: iState, eventType: number | string, payload): iState | null => {
		let reducer = map.get(eventType);
		if (!reducer) {
			reducer = defaultReducer;
		}
		if (!reducer) {
			throw new Error(
				`Reducer for event ${eventType} was not identified, please verify the mapping or include a default reducer`,
			);
		}
		return reducer(state, payload);
	};
};

const getMap = (reducer: tReducerType): Map<string | number, iReducer> | null => {
	if (reducer instanceof Map) {
		return reducer;
	}
	if (typeof reducer === 'function') {
		//Typed reducer
		return null;
	}
	const map = new Map<string | number, iReducer>();

	if (Array.isArray(reducer)) {
		reducer.forEach((path, index) => {
			map.set(index, path);
		});
		return map;
	}
	Object.keys(reducer).forEach((key) => {
		map.set(key, reducer[key]);
	});
	return map;
};

const updateStateStatus = (state: iState) => {
	let iteration = state.iteration + 1;
	let status;
	let statusIteration;
	switch (state.status) {
		case hookSystemStatuses.loading: //Really should not be here.
			status = hookSystemStatuses.ready;
			statusIteration = iteration;
			break;
		case hookSystemStatuses.ready:
			break;
		case hookSystemStatuses.inError:
			if (state.statusIteration + 3 <= iteration) {
				statusIteration = iteration;
				status = hookSystemStatuses.recovered;
			}
			break;
		case hookSystemStatuses.failed:
			if (state.statusIteration + 3 <= iteration) {
				statusIteration = iteration;
				status = hookSystemStatuses.inError;
			}
			break;
	}
	return { iteration, status, statusIteration };
};

export const reducerSystemFactory: iReducerSystemFactory = (reducer, errorReducer, defaultReducer): iReducerSystem => {
	let map = getMap(reducer);
	const _reducer: iKeyedReducer = map === null ? <iKeyedReducer>reducer : mappedReducerFactory(map, defaultReducer);
	const _errorReducer: iErrorReducer = errorReducer ? errorReducer : systemDefaultErrorReducer;

	return (state: iState, eventType: tDispatchEvent, payload): iState => {
		let results;
		try {
			if (typeof eventType === 'function') {
				results = eventType(state);
			} else if (typeof eventType === 'object') {
				results = eventType instanceof Error ? eventType : eventType;
			} else {
				results = _reducer(state, eventType, payload);
			}
		} catch (e) {
			results = e;
		}
		try {
			if (results instanceof Error) {
				results = _errorReducer(state, results);
			}
			if (!(results instanceof Error)) {
				if (results !== null) {
					results = Object.assign({}, state, results, updateStateStatus(state));
				} else {
					results = Object.assign({}, state, updateStateStatus(state));
				}
				return results;
			}
		} catch (e) {
			results = e;
		}

		console.error('Unexpected exception thrown while handling state');
		console.error(results);
		if (state.status === hookSystemStatuses.failed) {
			console.error('Critical State failure');
			throw results;
		}
		if (state.status === hookSystemStatuses.inError) {
			console.error('Secondary failure with state in error, critial system status');
			return Object.assign({}, baseState, state, { status: hookSystemStatuses.failed, iteration: state.iteration + 1 });
		}
		return Object.assign({}, state, { status: hookSystemStatuses.inError });
	};
};
