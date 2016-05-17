import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';

var FilterApi = {
	fetchFilters: function () {
		Promise.all([$.getJSON('/api/domain/'), $.getJSON('/api/category/')])
			.then(values => {
				AppDispatcher.handleAction({
					actionType: AppConstants.FETCH_FILTERS,
					data: values
				});
			})
			.catch(() => {
				AppDispatcher.handleAction({
					actionType: AppConstants.FETCH_FILTERS,
					data: null
				});
			})
	}
}

export default FilterApi;