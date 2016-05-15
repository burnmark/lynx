import {Dispatcher} from 'flux';

export default class AppDispatcher extends Dispatcher {
	handleAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
}
