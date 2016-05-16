import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';
import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';
var _store = {};

class AuthStoreClass extends EventEmitter {
	constructor() {
		super();
	}

	get() {
		return _store;
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListenr(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

}

const AuthStore = new AuthStoreClass();

AuthStore.dispatchToken = AppDispatcher.register(payload => {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.LOGIN_SUCCESSFUL:				
			_store = {
				loggedIn: true
			}
			AuthStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.LOGIN_FAILED:
			_store = {
				loggedIn: false,
				error: action.data
			}
			AuthStore.emit(CHANGE_EVENT);
			break;

		default: 
			return true;
	}
})

export default AuthStore;