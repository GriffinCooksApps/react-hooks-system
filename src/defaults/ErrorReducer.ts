

export const systemDefaultErrorReducer = (state, error: Error) => {
	console.error(error.message);
	return null;
}
