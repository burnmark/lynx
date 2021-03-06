import {Dispatcher} from 'flux';

export default class DispatcherClass extends Dispatcher {

	handleAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}

}

const AppDispatcher = new DispatcherClass();

export default AppDispatcher;
