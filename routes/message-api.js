var express = require('express');

module.exports.Router = function (Database) {
	var router = express.Router();

	router.get('/', (req, res, next) => {
		Database.getMessages(req.user.id) 
			.then(rows => res.json(rows))
			.catch(next);
	});

	router.get('/received', (req, res, next) => {
		Database.getRecievedMessages(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});
	
	router.get('/sent', (req, res, next) => {
		Database.getSentMessages(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});	

	// tbd
	// router.get('/new', (req, res, next) {

	// });

	return router;
}