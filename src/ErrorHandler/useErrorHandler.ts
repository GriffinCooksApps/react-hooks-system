import * as React from 'react';
import { IError } from '../../../griffincooks/griffincooks.app-Mobile/App/system/error/ErrorHandler';
import { reducerEvent } from '../../domains/reducerEvents';
import { HookContext } from '../src/Context';

export const useErrorHandler = () => {
	const { dispatch } = React.useContext(HookContext);

	const displayError = (err: IError) => {
		console.log('displaying error in use error handler');
		dispatch([reducerEvent.displayError, err]);

	};

	const dismissError = (err: IError) => {
		dispatch([reducerEvent.dismissError, err]);
	};

	return { displayError, dismissError };
};
