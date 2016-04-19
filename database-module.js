var Database = {
	// Given a username, returns a promise containing that user's info from db
	// If username does not exist in db, returns a promise containing null
	getUserByEmail(email) {
		return this._runQuery(
			(
				'SELECT * FROM user ' + 
				'WHERE email = :email'
			), 
			{
				email: email
			}
		);
	},

	// Given a userId, returns a promise containing that user's info from the db
	// If userId does not exist in db, returns a promise containing null
	getUserById(userId) {
		return this._runQuery(
			(
				'SELECT * FROM user u ' + 
				'WHERE u.id = :id'
			), 
			{
				id: userId
			}
		);
	},

	// Given a userId, returns a promise containing the categories that have 
	// appeared in messages that user has sent/received
	// If userId does not exist in the db or no categories have been found
	// in relation to that user, returns a promise containing null
	getCategories(userId) {
		return this._runQuery(
			(
				'SELECT DISTINCT c.name FROM category c ' + 
				'JOIN message_category mc ON c.id = mc.categoryId ' +
				'JOIN message m ON mc.messageId = m.id ' + 
				'WHERE m.senderId = :id OR m.recipientId = :id'
			),
			{
				id: userId
			}
		);
	},

	// Given a userId, returns a promise containing the domains that have
	// appeared in messages that user has sent/received
	// If userId does not exist in db or no domains have been found in relation
	// to that user, returns a promise containing null
	getDomains(userId) {
		return this._runQuery(
			(
				'SELECT DISTINCT d.name FROM domain d ' + 
				'JOIN link l ON d.id = l.domainId ' +
				'JOIN message m ON l.id = m.linkId ' +
				'WHERE m.senderId = :id OR m.recipientId = :id'
			), 
			{
				id: userId
			}
		);
	},

	// Given a userId, returns a promise containing all users that have send
	// or received a message from the authenticated user
	// If userId does not exist in db or no 'friends' have been found, returns
	// a promise containing null
	getFriends(userId) {
		return this._runQuery(
			(
				'SELECT DISTINCT u.id, u.displayName FROM user u ' + 
				'JOIN message m1 ON u.id = m1.recipientId ' + 
				'JOIN message m2 ON u.id = m2.senderId ' +
				'WHERE m1.senderId = :id AND m2.recipientId = :id'
			),
			{
				id: userId
			}
		);
	},

	// Given a userId, returns a promise containing all messages the user has received
	// If userId does not exist in db or no messages have been found in relation
	// to the user, returns a promise containing null
	getRecievedMessages(userId) {
		return this._runQuery(
			(
				'SELECT * from message ' + 
				'WHERE recipientId = :id'
			),
			{
				id: userId
			}
		);
	},

	// Given a userId, returns a promise containing all messages the user has received
	// If userId does not exist in db or no messages have been found in relation
	// to the user, returns a promise containing null
	getSentMessages(userId) {
		return this._runQuery(
			(
				'SELECT * from message ' + 
				'WHERE senderId = :id'	
			),
			{
				id: userId
			}
		);
	},

	// if user already exists -> promise resolves with null
	// if not
	// 	
	addUser(displayName, email, passwordHash) {	
		var _this = this;
		return new Promise((resolve, reject) => {
			_this.getUserByEmail(email)
				.then(rows => {
					if (rows && rows.length) {
						var err = new Error('User already exists');
						err.status = 409;
						reject(err); 
					} else {
						_this._connection
							.queryAsync(
								(
									'INSERT INTO user (displayName, email, passwordHash) ' + 
									'VALUES (:displayName, :email, :passwordHash)'
								), 
								{
									displayName: displayName,
									email: email,
									passwordHash: passwordHash
								}
							)
							.then(() => {
								_this.getUserById(_this._connection.lastInsertId())
									.then(rows => {
										rows && rows.length ?
											resolve(rows[0]) :
											reject(new Error('AHHHHHHH!'));
									});
							});							
					}
				})
				.catch(err => reject(err));
		});
	},

	// check this
	getDomain(domainName) {
		// if domainName already exists, return id
		// else add that domain name.
		var _this = this;
		return new Promise((resolve, reject) => {
			_this._connection
				.queryAsync(
					(
						'SELECT id FROM domain ' +
						'WHERE name LIKE :name ' + 
						'LIMIT 1'
					),
					{
						name: domainName
					}
				)
				.then(rows => {
					if (rows && rows.length) {
						console.log('domain already in db');
						resolve(rows[0].id);
					} else {
						console.log('domain not in db');
						_this._connection
							.queryAsync(
								(
									'INSERT INTO domain (name) ' +
									'VALUES (:name)'  
								),
								{
									name: domainName
								}
							)
							.then(() => resolve(_this._connection.lastInsertId()));
					}
				})
				.catch(err => resolve(err));
		});
	},

	getCategory(categoryName) {
		var _this = this;
		return new Promise((resolve, reject) => {
			_this._connection
				.queryAsync(
					(
						'SELECT id FROM category ' + 
						'WHERE name LIKE :name ' + 
						'LIMIT 1'
					),
					{
						name : categoryName
					}
				)
				.then(rows => {
					if (rows && rows.length) {
						resolve(rows[0].id);
					} else {
						_this._connection
							.queryAsync(
								(
									'INSERT INTO category (name)' + 
									'VALUES (:name)'
								),
								{
									name: categoryName
								}
							)
							.then(() => resolve(_this._connection.lastInsertId()));
					}
				})
				.catch(err => reject(err));
		});
	},

	// Given connection, query and params, returns a promise containing query contents
	// If query returns no results, returns a promise containing null
	_runQuery(query, params) {
		return this._connection
			.queryAsync(query, {id: params.id || '', email: params.email || ''})
			.then(rows => {
				return rows.length > 0 ? rows : null;
			})
			.catch(err => {return err;});
	}
}



module.exports = function (connection) {
	var database = Object.create(Database);
	database._connection = connection;
	return database;
}