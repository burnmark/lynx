import MessageApi from '../util/MessageWebApiUtils.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx'

var MessageActions = {
	getAllMessages: function () {
		return MessageApi.fetchMessages();
	},

	deleteMessage: function (messageId) {
		return MessageApi.deleteMessage(messageId);
	},

	favoriteMessage: function (messageId) {		
		return MessageApi.favoriteMessage(messageId);
	},

	sendMessage: function (url, recipient, message) {
		return MessageApi.sendMessage(url, recipient, message);
	}
}

export default MessageActions;