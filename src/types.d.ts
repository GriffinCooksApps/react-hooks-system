/** @format */

import { hookSystemStatuses } from './constants';

export interface iError {
	alterLevel: alertLevels;
	message: message;
	iteration: number;
	timestamp: number;
	source: Error | string | number;
}

type tError = iError | Error;

export interface iState {
	status: hookSystemStatuses;
	statusIteration: number;
	iteration: number;
	errors: tError[];
	[key: string]: any;
}

type dispatchPromiseTypes = iStateFunction | iStatableObject | [string | number, any];

export interface promiseKeeper {
	ready: boolean;
	result?: dispatchPromiseTypes;
	index: number;
}

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

export type tDispatchEvent = Error | string | number | iStateFunction | iStatableObject;

export interface iReducerSystem {
	(state: iState, eventType: tDispatchEvent, payload: any): iState;
}

export type tReducerType = iKeyedReducer | Map<string | number, iReducer> | { [key: string]: iReducer } | iReducer[];

export interface iReducerSystemFactory {
	(reducer: tReducerType, errorReducer?: iErrorReducer, defaultReducer?: iReducer): iReducerSystem;
}

interface iStatableObject {
	[key: string]: any;
}

export type tDispatchablePromise = Promise<dispatchPromiseTypes>;

interface iDispatcher {
	(eventType: tDispatchEvent | tDispatchablePromise, payload?: any): void;
}

type tInitializer = { (): { [key: stirng]: any } } | { [key: string]: any };
interface iUseHookManagerProps {
	initializer: tInitializer;
	reducerSystem: iReducerSystem;
}

interface iHookManagerResult {
	state: iState;
	dispatcher: iDispatcher;
}

export interface iUseHookManager {
	(props: iUseHookManagerProps): iHookManagerResult;
}
