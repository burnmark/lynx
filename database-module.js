var Database = {
	// Given a username, returns a promise containing that user's info from db
	// If username does not exist in db, returns a promise containing null
	getUserByUsername(username) {
		//searches user table for match by username
		var query = 'SELECT * FROM user WHERE username = :username';

		// return this._connection
		// 	.queryAsync(query, {username: username})
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});

		return _runQuery(query, {username: username});
	},

	// Given a userId, returns a promise containing that user's info from the db
	// If userId does not exist in db, returns a promise containing null
	getUserById(id) {		
		//searches user table for match by id
		var query = 'SELECT * FROM user WHERE id = :id';
		// return this._connection
		// 	.queryAsync(query, {id: id})
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});		
		return _runQuery(query, {id: id});
	},

	// Given a userId, returns a promise containing the categories that have 
	// appeared in messages that user has sent/received
	// If userId does not exist in the db or no categories have been found
	// in relation to that user, returns a promise containing null
	getCategoriesByUserId(id) {
		var query = 'SELECT DESTINCT c.name FROM categories c ' + 
			'JOIN message m ON c.id = m.categoryId' +
			'WHERE m.senderId = :id OR m.recipientId = :id';

		// return this._connection
		// 	.queryAsync(query, {id: id})
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});

		return _runQuery(query, {id: id});
	},

	// Given a userId, returns a promise containing the domains that have
	// appeared in messages that user has sent/received
	// If userId does not exist in db or no domains have been found in relation
	// to that user, returns a promise containing null
	getDomainsByUserId(id) {
		var query = 'SELECT DISTINCT d.name FROM domain d' + 
			'JOIN link l ON d.id = l.domainId' +
			'JOIN message m ON l.id = m.linkId' +
			'WHERE m.senderId = :id OR m.recipientId = :id'; 

		// return this._connection
		// 	.queryAsync(query, {id: id});
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});

		return _runQuery(query, {id: id});
	},

	// Given a userId, returns a promise containing all users that have send
	// or received a message from the authenticated user
	// If userId does not exist in db or no 'friends' have been found, returns
	// a promise containing null
	getFriendsByUserId(id) {
		// want the id and name of anyone the user has sent a message to 
		// and anyone that sent a message to user	
		var sentTo = 'SELECT DISTINCT u.id, u.displayName FROM user u' + 
			'JOIN message m1 ON u.id = m1.recipientId' + 
			'JOIN message m2 ON u.id = m2.senderId'
			'WHERE m1.senderId = :id AND m2.recipientId = :id';

		// return this._connection
		// 	.queryAsync(query, {id: id})
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});
		
		return _runQuery(query, {id: id});
	},

	// Given a userId, returns a promise containing all messages the user has received
	// If userId does not exist in db or no messages have been found in relation
	// to the user, returns a promise containing null
	getRecievedMessages(id) {
		var query = 'SELECT * from message' + 
			'WHERE recipientId = :id';

		// return this._connection
		// 	.queryAsync(query, {id: id})
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});
		
		return _runQuery(query, {id: id});
	},

	// Given a userId, returns a promise containing all messages the user has received
	// If userId does not exist in db or no messages have been found in relation
	// to the user, returns a promise containing null
	getSentMessages(id) {
		var query = 'SELECT * from message' + 
			'WHERE senderId = :id';

		// return this._connection
		// 	.queryAsync(query, {id: id})
		// 	.then(function (rows) {
		// 		return rows.length > 0 ? rows[0] : null;
		// 	});
		
		return _runQuery(query, {id: id});
	},

	// Given connection, query and params, returns a promise containing query contents
	// If query returns no results, returns a promise containing null
	_runQuery(query, params) {
		return this._connection
			.queryAsync(query, {id: params.id || '', username: params.username || ''})
			.then(function (rows) {
				return rows.length > 0 ? rows[0] : null;
			});
	}
}

module.exports = function (connection) {
	var database = Object.create(Database);
	database._connection = connection;
	return database;
}