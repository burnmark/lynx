var express = require('express');
var _ = require('lodash');

module.exports.Router = function (MessageDB) {
	var router = express.Router();

	router.get('/', (req, res, next) => {
		MessageDB.getMessages(req.user.id) 
			.then(rows => res.json(rows))
			.catch(next);
	});

	router.get('/received', (req, res, next) => {
		MessageDB.getRecievedMessages(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});
	
	router.get('/sent', (req, res, next) => {
		MessageDB.getSentMessages(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});	

	router.get('/favorite/:messageId', (req, res, next) => {
		MessageDB.favoriteMessage(req.params.messageId)
			.then(rows => console.log(rows));
	});

	// tbd
	// router.get('/new', (req, res, next) {

	// });

	return router;
}