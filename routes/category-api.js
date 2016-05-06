var express = require('express');

module.exports.Router = function (Database) {
	var router = express.Router();

	/*
	delete specific category 
	app.delete('/:cat', function (req, res, next) {
		req.params.cat <- get the param passes in
	});

	get messages with specific category?
	app.get('/:cat/mesages', function (req, res, next) {
		req.params.cat
	})

	get messages but execute specific query
	app.get('/messages?query=jsdhfs', function req, res, next) {
		req.query.query <- getting the query
	});
	 */


	router.get('/', (req, res, next) => {
		Database.getCategories(req.user.id)
			.then(rows => res.json(rows))
			.catch(next);
	});	

	return router;
}