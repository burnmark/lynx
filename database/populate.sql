

DROP PROCEDURE IF EXISTS insert_link;
DROP PROCEDURE IF EXISTS insert_message;
DROP PROCEDURE IF EXISTS insert_mc;


DELIMITER //
CREATE PROCEDURE insert_link (
	domainName VARCHAR(127), 
	url VARCHAR(2083), 
	title VARCHAR(127), 
	description VARCHAR(255),
	imgUrl VARCHAR(2083)
)
	BEGIN
		DECLARE domainId INT;

		SELECT id INTO domainId FROM domain WHERE name = domainName LIMIT 1;

		INSERT INTO link (domainId, url, title, description, imgUrl)
		VALUES (domainId, url, title, description, imgUrl);
	END
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insert_message (	
	linkUrl VARCHAR(2083),
	senderName VARCHAR(127),
	recipientName VARCHAR(127),
	note VARCHAR(511)
)
	BEGIN
		DECLARE linkid INT;
		DECLARE senderId INT;
		DECLARE recipientId INT;

		SELECT id INTO linkid FROM link WHERE url = linkUrl LIMIT 1;
		SELECT id INTO senderId FROM user WHERE displayName = senderName LIMIT 1;
		SELECT id INTO recipientId FROM user WHERE displayName = recipientName LIMIT 1;

		INSERT INTO message (linkid, senderId, recipientId, note)
		VALUES (linkid, senderId, recipientId, note);
	END;
//
DELIMITER ;


DELIMITER //
CREATE PROCEDURE insert_mc (
	noteIn VARCHAR(511),
	categoryName VARCHAR(127)
)
	BEGIN
		DECLARE messageId INT;
		DECLARE categoryId INT;

		SELECT id INTO messageId FROM message WHERE note = noteIn LIMIT 1;
		SELECT id INTO categoryId FROM category WHERE name = categoryName LIMIT 1;

		INSERT INTO message_category (messageId, categoryId)		
		VALUES (messageId, categoryId);
	END;
//
DELIMITER ;

INSERT INTO domain (name) VALUES 
	('facebook'), 
	('reddit'), 
	('buzzfeed'), 
	('twitter'), 
	('yahoo');

INSERT INTO category (name) VALUES 
	('funny'), 
	('science'), 
	('tech'), 
	('weird'), 
	('crazy'), 
	('math'), 
	('programming'), 
	('tips');

INSERT INTO user (displayName, email, passwordHash)
VALUES
	('enamark', 'enagmail.com', 'sdkhfjdsh'),
	('alexburn', 'alexgmail.com', 'sdjfhksjdhg'),
	('amycool', 'amygmail.com', 'sdjhfjksdhf'),
	('jeff', 'jeffgmail.com', 'skdjghfksdjhfjks'),
	('stearns', 'stearnsgmail.com', 'kjsdhfkjdhsghkds');

	

CALL insert_link (
	'facebook', 
	'www.facebook.com', 
	'Facebook', 
	'Social media site. Connect with old friends, new friends and complete strangers!',
	'https://www.facebookbrand.com/img/fb-art.jpg'
);
CALL insert_link (
	'reddit',
	'www.reddit.com',
	'Reddit',
	'The front page of the internet',
	'https://fh-uploads-addressreport.netdna-ssl.com/582ab36d-a58b-449e-8e57-784dea3eeb09'
);
CALL insert_link (
	'buzzfeed',
	'www.buzzfeed.com',
	'Buzzfeed',
	'Website that has mastered the art of distracting people',
	'http://14575-presscdn-0-73.pagely.netdna-cdn.com/wp-content/uploads/2015/01/buzzfeed-logo.jpg'
);
CALL insert_link (
	'twitter',
	'www.twitter.com',
	'Twitter',
	'Share every moment of your life with people who care.',
	'https://pmcdeadline2.files.wordpress.com/2014/06/twitter-logo.png?w=970'
);
CALL insert_link (
	'yahoo',
	'www.yahoo.com',
	'Yahoo!',
	'Jack of all trades, master of none',
	'http://l2.yimg.com/bt/api/res/1.2/rt4LYW.WMjOpof_ahsTcjA--/YXBwaWQ9eW5ld3M7cT04NQ--/http://mit.zenfs.com/1776/2013/04/Yahoo_Logo.png'
);

CALL insert_message (
	'www.yahoo.com',
	'enamark',
	'alexburn',
	'check this out, its pretty cool!'
);
CALL insert_message (
	'www.buzzfeed.com',
	'alexburn',
	'enamark',
	'I saw your message, and i agree... it is cool. BUT you should actually check out buzzfeed'
);
CALL insert_message (
	'www.twitter.com',
	'amycool',
	'jeff',
	'I thought you would appreciate this tweet!'
);
CALL insert_message (
	'www.twitter.com',
	'jeff',
	'amycool',
	'haha that is pretty funny! check this one out'
);
CALL insert_message (
	'www.reddit.com',
	'stearns',
	'enamark',
	'Become addicted to reddit please.'
);
CALL insert_message (
	'www.facebook.com',
	'enamark',
	'stearns',
	'Become addicted to facebook please.'
);

CALL insert_mc (
	'check this out, its pretty cool!',
	'funny'
);
CALL insert_mc (
	'I saw your message, and i agree... it is cool. BUT you should actually check out buzzfeed',
	'funny'
);
CALL insert_mc (
	'I saw your message, and i agree... it is cool. BUT you should actually check out buzzfeed',
	'weird'
);
CALL insert_mc (
	'I saw your message, and i agree... it is cool. BUT you should actually check out buzzfeed',
	'science'
);
CALL insert_mc (
	'I thought you would appreciate this tweet!',
	'crazy'
);
CALL insert_mc (
	'I thought you would appreciate this tweet!',
	'funny'
);
CALL insert_mc (
	'haha that is pretty funny! check this one out',
	'funny'
);
CALL insert_mc (
	'haha that is pretty funny! check this one out',
	'tech'
);
CALL insert_mc (
	'Become addicted to reddit please.',
	'programming'	
);
CALL insert_mc (
	'Become addicted to reddit please.',
	'tips'
);
CALL insert_mc (
	'Become addicted to reddit please.',
	'math'
);
CALL insert_mc (
	'Become addicted to facebook please.',
	'funny'
);
CALL insert_mc (
	'Become addicted to facebook please.',
	'weird'
);
CALL insert_mc (
	'Become addicted to facebook please.',
	'crazy'
);
