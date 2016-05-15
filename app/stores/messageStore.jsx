import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import appConstants from '../constants/appConstants.jsx';
import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';

var _store = {
	messages: []
};

//0: all sent, 1: all received, 2: all sent and received
var rawData = Promise.all([]);

var addMessage = function (message) {
	_store.messages.push(item);
	// have to make a call to the api to add this message to db
}

var removeMessage = function (index) {
	_store.messages.splice(index, 1);
	// have to make a call to the api to delete this message from db
}

export default class messageStore {
	constructor() {
		super();
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	getMessages() {
		return _store.messages;
	}
}

AppDispatcher.register(payload => {
	var action = payload.action;
	switch (action.actionType) {
		case appConstants.ADD_MESSAGE:
			addMessage(action.data);
			messageStore.emit(CHANGE_EVENT);
			break;

		case appConstants.REMOVE_MESSAGE:
			removeItem(action.data);
			messageStore.emit(CHANGE_EVENT);
			break;

		default:
			return true;
	}
})