/** @format */

export const systemDefaultErrorReducer: iErrorReducer = (state, error) => {
	console.error(error.message);
	let message: string = '';
	let type: string = '';
	if (error instanceof Error) {
		message = error.message;
		type = 'Error';
	} else if (typeof error === 'string') {
		message = error;
		type = 'alert';
	}
	let errors = state.errors.push({ message: message, type: type });
	return Object.assign({}, state, { errors });
};
