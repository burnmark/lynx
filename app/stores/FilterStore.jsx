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

const FilterStore = new FilterStoreClass();

FilterStore.dispatchToken = AppDispatcher.register(payload => {
	var action = payload.action;
	switch(action.actionType) {
		case AppConstants.FETCH_FILTERS:
			if (action.data) {
				// 0 is domain, 1 is category
				_store = {
					domains: action.data[0],
					// add people later, db isnt ready
					categories: action.data[1]
				}
			} else {
				_store = {
					domains: [],
					//add people later, db isnt ready yet
					categories: []
				}
			}
			FilterStore.emit(CHANGE_EVENT);
			break;
			
		default:
			return true;
	}
})

export default FilterStore;