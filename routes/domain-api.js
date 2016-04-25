var express = require('express');

module.exports.Router = function (Database) {
	var router = express.Router();

	router.get('/get', (req, res, next) => {
		Database.getDomains(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});

	return router;
}