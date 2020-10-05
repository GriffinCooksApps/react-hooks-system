// import { getBureau } from '../APIServices/commonServices';
// import { fetchBureaus } from './commonFunctions';

class DarkSide {
	constructor() {}

	updates = [];

	// callAPI(apiFun, payload) {}

	// fetchBureaus(aacs: [string]) {
	//   const list = fetchBureaus(aacs);
	//   this.addUpdate({});
	// }

	addAPICall(promise, fun, params) {
	  var results = promise.then((res) => res).catch((e) => e);

	  this.updates.push({
		fun,
		results,
		params,
	  });
	}

	/**
	 *
	 * @param result { handlerFunction(state, result, prams), result, params }
	 */
	addUpdate(result) {
	  this.updates.push(result);
	}

	addJob(fun) {
	  fun(this.addUpdate);
	}

	getUpdates() {
	  //
	  if (this.updates.length > 0) {
		let val = this.updates.splice(0, this.updates.length);
		return val;
	  }

	  return null;
	}
  }

  const darkSide = new DarkSide();

  export default darkSide;
  import darkSide from './DarkSide';
// import { reducerEvent } from '../reducers/reducerEvents';
import { systemErrorHandler } from '../../../../griffincooks/griffincooks.app-Mobile/App/system/error/ErrorHandler';
import { errorFlags } from '../../../../griffincooks/griffincooks.app-Mobile/App/system/error/ExceptionFlags';

export const getServiceUpdates = () => {
	try {
		const res = darkSide.getUpdates();
		return res;
	} catch (e) {
		systemErrorHandler('Error: ' + e.message, '', errorFlags.GeneralError);
		return null;
	}
};
