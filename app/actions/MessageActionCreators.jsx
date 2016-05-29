import MessageApi from '../util/MessageWebApiUtils.jsx';
import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx'

var MessageActions = {
	getAllMessages: function () {
		return MessageApi.fetchMessages();
	},

	deleteMessage: function (messageId) {
		MessageApi.deleteMessage(messageId);
	},

	favoriteMessage: function (messageId) {		
		MessageApi.favoriteMessage(messageId);
	}
}

export default MessageActions;