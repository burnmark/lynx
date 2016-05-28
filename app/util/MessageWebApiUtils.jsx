import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';


var MessageApi = {
	fetchMessages: function () {
		return Promise.all([
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
	},

	fetchCategories: function (messageId) {
		$.getJSON('/api/category/' + messageId)
			.then(data => {
				AppDispatcher.handleAction({
					actionType: AppConstants.FETCH_CATEGORIES,
					data: {
						id: messageId,
						categories: data
					}
				});
			});
	},

	deleteMessage: function (messageId) {
		$.getJSON('/api/message/delete/' + messageId)
			.then(() => {
				AppDispatcher.handleAction({
					actionType: AppConstants.REMOVE_MESSAGE,
					data: {
						id: messageId
					}
				});
			});
	},

	favoriteMessage: function (messageId) {
		$.getJSON('/api/message/favorite/' + messageId) 
			.then(() => {
				AppDispatcher.handleAction({
					actionType: AppConstants.FAVORITE_MESSAGE,
					data: {
						id: messageId
					}
				})
			})
	}
}

export default MessageApi;