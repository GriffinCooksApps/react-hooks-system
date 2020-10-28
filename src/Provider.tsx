/** @format */

import { iHookContext } from './ReactHooksSystems';

import * as React from 'react';
import { iReducer, iState } from './types';
import { systemDefaultErrorReducer } from './defaults/ErrorReducer';

const simpleReducer = (state, payload) => {
	// @ts-ignore
	return Object.assign({}, state, payload);
};

const Provider = ({ onReady, children }) => {
	const [state, reducer] = React.useReducer(simpleReducer, {});
};

export default Provider;
