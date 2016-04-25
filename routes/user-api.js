var express = require('express');

module.exports.Router = function (Database) {
	var router = express.Router();

	router.get('/me', (req, res) => {
		res.json(req.user);
	});
	
	router.get('/friends', (req, res, next) => {
		Database.getFriends(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});

	return router;
}