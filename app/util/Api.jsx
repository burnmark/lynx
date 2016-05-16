function dispatch()
var Api = {
	fetchMessages: function () {
		return Promise.all([
			$.getJSON('/api/message/sent'),
			$.getJSON('/api/message/received'), 		
			$.getJSON('/api/message/')
		]);
	}
}