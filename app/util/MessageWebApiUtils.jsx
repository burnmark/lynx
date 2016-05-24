import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';


var MessageApi = {
	fetchMessages: function () {
		Promise.all([
			$.getJSON('/api/message/sent'),
			$.getJSON('/api/message/received'), 		
			$.getJSON('/api/message/')
		])
			.then(values => {
				AppDispatcher.handleAction({
					actionType: AppConstants.FETCH_MESSAGES,
					data: values
				});
			})
			.catch(() => {
				AppDispatcher.handleAction({
					actionType: AppConstants.FETCH_MESSAGES,
					data: null
				});
			});
	}
}

export default MessageApi;