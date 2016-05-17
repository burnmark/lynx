import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';
import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';
var _store = {};

class MessageStoreClass extends EventEmitter {
	constructor() {
		super();
	}

	getSent() {
		return _store.sent;
	}

	getReceived() {
		return _store.received;
	}

	getAll() {
		return _store.all;
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListenr(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}

const MessageStore = new MessageStoreClass();

MessageStore.dispatchToken = AppDispatcher.register(payload => {
	var action = payload.action;
	switch (action.actionType) {
		case AppConstants.FETCH_MESSAGES:
			var data = action.data;
			if (data) {
				_store = {
					sent: data[0],
					received: data[1],
					all: data[2]
				};
			} else {
				_store = {
					sent: [],
					received: [],
					all: []
				}
			}
			MessageStore.emit(CHANGE_EVENT);
			break;

		default:
			return true;
	}
})

export default MessageStore;