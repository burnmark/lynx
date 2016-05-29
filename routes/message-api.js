var express = require('express');
var _ = require('lodash');

function mergeOnCategory(rows) {
	var arr = [],
		obj = {},					
		category;

	_.forEach(rows, (row, i) => {
		category = row.categoryName;
		
		if (_.isNil(obj[row.id])) {	
			row.categoryName = [];
			arr.push(row);
			obj[row.id] = arr.length - 1;
		}
		
		arr[obj[row.id]].categoryName.push(category);

	});
	
	return arr;
}

module.exports.Router = function (MessageDB) {
	var router = express.Router();

	router.get('/', (req, res, next) => {
		MessageDB.getMessages(req.user.id) 
			.then(rows => {
				rows = mergeOnCategory(rows);
				console.log(rows);
				res.json(mergeOnCategory(rows))
			})
			.catch(next);
	});

	router.get('/sent', (req, res, next) => {
		MessageDB.getSentMessages(req.user.id)
			.then(rows => res.json(mergeOnCategory(rows)))
			.catch(next);
	});	

	router.get('/received', (req, res, next) => {
		MessageDB.getRecievedMessages(req.user.id)
			.then(rows => res.json(mergeOnCategory(rows)))
			.catch(next);
	});	

	router.get('/starred', (req, res, next) => {
		MessageDB.getStarredMessages(req.user.id)
			.then(rows => {
				rows = mergeOnCategory(rows);
				console.log(rows);
				res.json(mergeOnCategory(rows))
			})
			.catch(next);
	})

	router.get('/favorite/:messageId', (req, res, next) => {
		MessageDB.favoriteMessage(req.params.messageId)
			.then(rows => console.log(rows));
	});

	// tbd
	// router.get('/new', (req, res, next) {

	// });

	return router;
}
