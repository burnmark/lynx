import MessageApi from '../util/MessageWebApiUtils.jsx';

var MessageActions = {
	getAllMessages: function () {
		MessageApi.fetchMessages();
	}
}

export default MessageActions;