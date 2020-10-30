/** @format */

interface iState{

	[key:string]: any;
}


export class HookCore {
	constructor(){

		this.states = new Map();
	}

	private states: Map<string,iState>;
	private objRoot:iFullState;

}


import type {iDispatcher, tInitializer} from "../types";
import {baseState} from "../ReducerSystem";
import {
	dispatchPromiseTypes,
	iReducerSystem, iStatableObject,
	iState, iStateFunction,
	iUseHookManagerProps,
	tDispatchablePromise,
	tDispatchEvent
} from "../types";


type dispatchPromiseTypes = iStateFunction | iStatableObject | [string | number, any];

export interface promiseKeeper {
	ready: boolean;
	result?: dispatchPromiseTypes;
	index: number;
}

export type tDispatchEvent = Error | string | number | iStateFunction | iStatableObject;

type tDispatchedPromise = Promise<dispatchPromiseTypes>;

interface iDispatcher {
	(eventType: tDispatchEvent | tDispatchedPromise, payload?: any): void;
}

export interface iUseHookManager {
	(props: {
		initializer: tInitializer;
		reducerSystem: iReducerSystem;
	}): { state:iState, dispatcher: iDispatcher }
}


export const useHookManager: iUseHookManager = (props) => {
	let {reducerSystem, initializer} = props;

	const initialization = (initializer: tInitializer) => {

		if (typeof initializer === 'object') {
			return Object.assign({}, baseState, initializer);
		} else if (typeof initializer === 'function') {
			return Object.assign({}, baseState, initializer());
		} else throw new Error('Invalid initializer, it must be a valid state or function that returns a valid state');
	}
	let _state = initialization(initializer);
	const _reducerSystem = reducerSystem;
	const promises: promiseKeeper[] = [];

	let interval: any = null;

	const checkPromises = () => {
		while (promises.length > 0) {
			let promise = promises.find((p, i) => {
				if (p.ready) {
					p.index = i;
					return true;
				} else return false;
			});
			if (!(promise)) return;
			promises.splice(promise.index, 1);
			if (Array.isArray(promise.result)) {
				dispatcher(promise.result[0], promise.result[1]);
			} else if (promise.result === undefined) {
				dispatcher(new Error('dispatching undefined from promise'));
			} else
				dispatcher(promise.result);
		}
	}

	const startChecker = () => {
		if (interval !== null) {
			interval = setInterval(checkPromises, 50);
		}
	}

	const processPromise= async (keeper:promiseKeeper, promise: tDispatchedPromise):Promise<void> => {
		keeper.result = await promise.then(res => res).catch(e => e);
		keeper.ready = true;
	}
	const handlePromise = (p: tDispatchedPromise) => {
		if (interval === null) startChecker();
		let index = promises.length;
		let promiseKeeper =  {ready: false, index:-1};
		promises[index] = promiseKeeper;
		processPromise(promiseKeeper, p).catch(e => dispatcher(e));
	}

	let dispatcher: iDispatcher = (eventType, payload) => {
		if (eventType instanceof Promise) {
			handlePromise(eventType);
		}
		else {
			_state = _reducerSystem(_state, eventType, payload);
		}
	}

	let getState = () => {
		return _state;
	}

	return {state: getState(), dispatcher};
}

