var express = require('express');
var _ = require('lodash');

module.exports.Router = function (Database) {
	var router = express.Router();

	router.get('/', (req, res, next) => {
		Database.getDomains(req.user.id)
			.then(rows => res.json(_.map(rows, 'name')))
			.catch(next);
	});

	return router;
}

