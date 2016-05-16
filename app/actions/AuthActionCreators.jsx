import AuthApi from '../util/AuthWebApiUtils.jsx';

var AuthActions = {
	login: function () {
		AuthApi.login();
	},

	logout: function () {

	}
}

export default AuthActions;