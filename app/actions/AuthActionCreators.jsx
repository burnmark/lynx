// import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
// import AppConstants from '../constants/AppConstants.jsx';
import AuthWebApiUtils from '../util/AuthWebApiUtils.jsx';

var AuthActions = {
	login: function () {
		AuthWebApiUtils.login();
	},

	logout: function () {

	}
}

export default AuthActions;