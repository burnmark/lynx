import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';
import {EventEmitter} from 'events';

var CHANGE_EVENT = 'change';
var _store = {};

class FilterStoreClass extends EventEmitter {
	constructor() {
		super();
	}

	getDomains() {
		return _store.domains;
	}

	getPeople() {
		return _store.people;
	}

	getCategories() {
		return _store.categories;
	}

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListenr(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
}