import AppDispatcher from '../dispatcher/AppDispatcher.jsx';
import AppConstants from '../constants/AppConstants.jsx';


var Auth = {
	login: function () {
		$.ajax({
			type: 'POST',
			url: '/api/signin',
			data: JSON.stringify({
				email: 'enagmail.com',
				password: 'ena'
			}),
			success: function () {
				AppDispatcher.handleAction({
					actionType: AppConstants.LOGIN_SUCCESSFUL
				});
			},
			error: function (xhr, status, error) {
				AppDispatcher.handleAction({
					actionType: AppConstants.LOGIN_FAILED,
					data: error
				});	
			},
			dataType: 'json',
		  	contentType: 'application/json'
		});
	}
}

export default Auth;