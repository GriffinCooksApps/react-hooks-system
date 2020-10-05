import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Modal, StyleSheet, Text, View } from 'react-native';
import { SystemFlags, Flags } from '../../../griffincooks/griffincooks.app-Mobile/App/configuration/configuration/SystemFlags';
import { buildMessages, processError } from '../../../griffincooks/griffincooks.app-Mobile/App/system/error/errorHelper';
import { alertSettings, AlertLevels } from '../../../griffincooks/griffincooks.app-Mobile/App/system/error/ErrorModel';
import { ErrorText } from '../../components/common/text/ErrorText';
import { useErrorHandler } from './useErrorHandler';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
		justifyContent: 'center',
		alignContent: 'center',
		paddingHorizontal: 12,
	},
	alertView: {
		top: 30,
		left: 30,
		width: 400,
		backgroundColor: '#AA5555',
	},
	errorText: {
		color: '#DD4444',
	},
	edgy: {
		height: '100%',
		width: '100%',
	},
});


const errors = [];

export interface IError {
	name,
	message,
	location,
	category,
	errorCode,
}

export const myErrorHandler = (error: Error, location = '', category = '', errorCode = null) => {
	var err: IError;

	console.log('Erro log can be found here');




	if (!SystemFlags[Flags.disableErrors]) {
		// if (!SystemFlags[Flags.disableErrors]) {
		//   console.error({
		//     errror_tyle: error.name,
		//     location,
		//     message: error.message,
		//   });
		// }
		err = {
			name: error.name,
			message: error.message,
			category: category,
			errorCode: errorCode,
			location: location,
		};
	}
	errors.push(err);
};

const alertList = {
	info: [],
	warning: [],
	error: [],
	critical: [],
};

setInterval(() => {
	let now = new Date().getTime();
	for (let i = alertList.info.length - 1; i >= 0; i--) {
		if (alertList.info[i].timestamp + 5000 >= now) {
			alertList.info.slice(i, i + 1);
		}
	}
	for (let i = alertList.info.length - 1; i >= 0; i--) {
		if (alertList.warning[i].timestamp + 15000 >= now) {
			alertList.warning.slice(i, i + 1);
		}
	}
	for (let i = alertList.error.length - 1; i >= 0; i--) {
		if (alertList.error[i].timestamp + 30000 >= now) {
			alertList.error.slice(i, i + 1);
		}
	}
	for (let i = alertList.critical.length - 1; i >= 0; i--) {
		if (alertList.critical[i].timestamp + 5000 >= now) {
			alertList.critical.slice(i, i + 1);
		}
	}
}, 1000);

const createErrorBanner = (messages) => {
	let msgBoxes = messages.map((msg) => {
		return <Text style={styles.errorText}>{msg}</Text>;
	});
	return (
		<Modal>
			<View style={styles.alertView}>{msgBoxes}</View>
		</Modal>
	);
};

const alertData = {
	id: 0,
};
export const setAlertMessage = (
	message: string,
	level: AlertLevels = AlertLevels.Warning,
) => {
	let timestamp = new Date().getTime();
	const id = alertData.id++;
	alertList[level].push({ id, message, timestamp });
};

/**
 * Need to dispatch perhaps, and work on resolving from there.
 */
export const buildErrorBanner = () => {
	//Apply errors
	let errorList = errors.splice(0, errors.length);
	if (errorList.length > 0) {
		errorList.forEach((error) => {
			let [level, message] = processError(error);
			setAlertMessage(message, level);
		});
	}
	let messages = buildMessages(alertList.critical, alertSettings.critical);
	messages.concat(buildMessages(alertList.error, alertSettings.error));
	messages.concat(buildMessages(alertList.warning, alertSettings.warning));
	messages.concat(buildMessages(alertList.info, alertSettings.info));

	let infoBanners = messages.length === 0 ? null : createErrorBanner(messages);

	return infoBanners;
};

function ErrorFallback({ resetErrorBoundary }) {
	return (
		<View style={[styles.container]}>
			<View>
				<ErrorText>
					{' '}
          Something went wrong: {'\n'}{' '}
					{errors[errors.length - 1].message.substring(0, 400)}
				</ErrorText>
				<Button title="try Again" onPress={resetErrorBoundary} />
			</View>
		</View>
	);
}
const ErrorBlocker = ({ children }: { children: React.ReactNode }) => {
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
			{children}
		</ErrorBoundary>
	);
};

export const ErrorHandler = ({ children }) => {
	const { displayError } = useErrorHandler();


	if (errors.length > 0) {
		var error = errors.splice(0, 1);

		displayError(error[0]);
	}
	return (
		<ErrorBlocker>
			<View style={styles.edgy}>{children}</View>
		</ErrorBlocker>
	);
};
