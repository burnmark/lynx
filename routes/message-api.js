var express = require('express');
var _ = require('lodash');

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

	router.get('/favorite/:messageId', (req, res, next) => {
		console.log('favorite clicked made it to router');
		Database.favoriteMessage(req.params.messageId)
			.then(rows => console.log(rows));
	});

	// tbd
	// router.get('/new', (req, res, next) {

	// });

	return router;
}