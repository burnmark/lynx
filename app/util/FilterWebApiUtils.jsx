import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';

var FilterApi = {
	fetchFilters: function () {
		// Promise.all([$.getJSON('/api/domain/'), $.getJSON('/api/category/')])
		// 	.then(values => {
		// 		AppDispatcher.handleAction({
		// 			actionType: AppConstants.FETCH_FILTERS,
		// 			data: values
		// 		});
		// 	})
		// 	.catch(() => {
		// 		AppDispatcher.handleAction({
		// 			actionType: AppConstants.FETCH_FILTERS,
		// 			data: null
		// 		});
		// 	});
		$.getJSON('/api/domain/', function (data, err) {
			if (err) {
				AppDispatcher.handleAction({
					actionType: AppConstants.FETCH_FILTERS,
					data: null
				});
			}
			AppDispatcher.handleAction({
				actionType: AppConstants.FETCH_FILTERS,
				data: data
			});
		});
	}
}

export default FilterApi;