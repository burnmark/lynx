import _ from 'lodash';

import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';
import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';
var _store = {};

class MessageStoreClass extends EventEmitter {
	constructor() {
		super();
	}

	getAll() {
		return _store.all;
	}

	getSent() {
		return _store.sent;
	}

	getReceived() {
		return _store.received;
	}

	getStarred() {
		return _store.starred;
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}

const MessageStore = new MessageStoreClass();

MessageStore.dispatchToken = AppDispatcher.register(payload => {
	var action = payload.action;
	var data = action.data;
	switch (action.actionType) {
		case AppConstants.FETCH_MESSAGES:
			if (data) {
				_store = {
					all: data[0],
					sent: data[1],
					received: data[2],
					starred: data[3]					
				};
			} else {
				_store = {
					all: [],
					sent: [],
					received: [],
					starred: []					
				}
			}
			console.log(_store.received);
			MessageStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.FAVORITE_MESSAGE:
			console.log('in store');
			var id = data.id;
			_.forEach(_store, (messages, key) => {
				_.forEach(messages, (message, key) => {
					if (message.id === id) {
						message.favorited = !parseInt(message.favorited);
					}
				})
			});
			MessageStore.emit(CHANGE_EVENT);
			break;

		case AppConstants.REMOVE_MESSAGE:
			// need to find the message in all states and remove
			break;

		default:
			return true;
	}
})

export default MessageStore;