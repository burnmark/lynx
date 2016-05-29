import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';


var MessageApi = {
	fetchMessages: function () {
		return Promise.all([
			$.getJSON('/api/message/'),
			$.getJSON('/api/message/sent'),
			$.getJSON('/api/message/received'),
			$.getJSON('/api/message/starred')					
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
		return Promise.all([$.getJSON('/api/message/favorite/' + messageId)]);
	}
}

export default MessageApi;