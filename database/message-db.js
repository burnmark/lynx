var MessageDB = {
	getMessages(userId) {
		return this._getObjects(
			(
				'SELECT ' + 
					'm.id, ' +
					'm.linkId, ' +
					'm.note, ' +
					'UNIX_TIMESTAMP(m.timeSent) AS timeSent, ' +
					'm.isRead, ' + 
					'm.favorited, ' +
					'l.url, ' + 
					'l.title, ' + 
					'l.description, ' + 
					'l.imgUrl, ' + 
					'sender.email AS senderEmail, ' + 
					'sender.displayName AS senderName, ' +
					'sender.imgUrl AS senderImg, ' +
					'c.name AS categoryName ' +
				'FROM message m ' + 
				'JOIN link l on m.linkId = l.id ' + 
				'JOIN user sender on m.senderId = sender.id ' +
				'JOIN message_category mc on mc.messageId = m.id ' + 
				'JOIN category c on mc.categoryId = c.id ' +  
				'WHERE m.senderId = :id OR m.recipientId = :id'
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
		return this._getObjects(
			(
				'SELECT ' + 
					'm.id, ' +
					'm.linkId, ' +
					'm.note, ' +
					'UNIX_TIMESTAMP(m.timeSent) AS timeSent, ' +
					'm.isRead, ' + 
					'm.favorited, ' +
					'l.url, ' + 
					'l.title, ' + 
					'l.description, ' + 
					'l.imgUrl, ' + 
					'sender.email AS senderEmail, ' + 
					'sender.displayName AS senderName, ' +
					'sender.imgUrl AS senderImg, ' +
					'c.name AS categoryName ' +
				'FROM message m ' + 
				'JOIN link l on m.linkId = l.id ' + 
				'JOIN user sender on m.senderId = sender.id ' + 
				'JOIN message_category mc on mc.messageId = m.id ' + 
				'JOIN category c on mc.categoryId = c.id ' + 
				'WHERE m.recipientId = :id' 
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
		return this._getObjects(
			(
				'SELECT ' + 
					'm.id, ' +
					'm.linkId, ' +
					'm.note, ' +
					'UNIX_TIMESTAMP(m.timeSent) AS timeSent, ' +
					'm.isRead, ' + 
					'm.favorited, ' +
					'l.url, ' + 
					'l.title, ' + 
					'l.description, ' + 
					'l.imgUrl, ' + 
					'sender.email AS senderEmail, ' + 
					'sender.displayName AS senderName, ' +
					'sender.imgUrl AS senderImg, ' +
					'c.name AS categoryName ' +
				'FROM message m ' + 
				'JOIN link l on m.linkId = l.id ' + 
				'JOIN user sender on m.recipientId = sender.id ' + 
				'JOIN message_category mc on mc.messageId = m.id ' + 
				'JOIN category c on mc.categoryId = c.id ' + 
				'WHERE senderId = :id'	
			),
			{
				id: userId
			}
		);
	},

	favoriteMessage(messageId) {
		return this._connection
			.queryAsync(
				'UPDATE message SET favorited = NOT favorited WHERE id = :id', 
				{id: messageId}
			);
	},

	// Given connection, query and params, returns a promise containing query contents
	// If query returns no results, returns a promise containing null
	_getSingleObject(query, params) {
		return this._connection
			.queryAsync(query, {id: params.id || '', email: params.email || ''})
			.then(rows => {
				return rows && rows.length > 0 ? rows[0] : null;
			});
	},

	_getObjects(query, params) {
		return this._connection
			.queryAsync(query, {id: params.id})
			.then(rows => {
				return rows && rows.length > 0 ? rows : null;
			});
	}
}

module.exports = function (connection) {
	var messageDB = Object.create(MessageDB);
	messageDB._connection = connection;
	return messageDB;
}