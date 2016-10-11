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
	
	//change jquery to use fetch!
	deleteMessage: function (messageId) {
		return Promise.all([$.getJSON('api/message/delete/' + messageId)]);
	},

	favoriteMessage: function (messageId) {
		return Promise.all([$.getJSON('/api/message/favorite/' + messageId)]);
	},
	
	sendMessage: function (url, recipient, note) {
		return
	}
	
}

export default MessageApi;