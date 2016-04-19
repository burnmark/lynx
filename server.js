// if "EADDRINUSE", do: $ sudo kill $(sudo lsof -t -i:80)
global.__base = __dirname + '/';

var dbConfig = require(__base + 'secret/config-maria.json');

var express = require('express'),
	app = express(),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session);

var bcrypt = require('bcrypt'),
	bodyParser = require('body-parser'),
	morgan = require('morgan');

var Maria = require('mariasql'),
	bluebird = require('bluebird'),
	connection = bluebird.promisifyAll(new Maria(dbConfig)),
	Database = require(__base + 'database-module')(connection);

var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

var cookieSigSecret = process.env.SIGSECRET;
if (!cookieSigSecret) {
	console.error('please set SIGSECRET');
	process.exit(1);
}

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
	secret: cookieSigSecret,
	resave: false,
	saveUninitialized: false,
	store: new RedisStore()
}));

passport.use(new LocalStrategy(function (email, password, done) {
	console.log(email, password);
	Database.getUserByEmail(email)
		.then(function (dbUser) {		

			if (!dbUser) return done(null, false, {message: 'Incorrect credentials.'});

			bcrypt.compare(password, dbUser.password, function (err, matches) {
				if (err) return done(err);						
				if (!matches) return done(null, false, {message: 'Incorrect credentials'});

				console.log('password is good');
				return done(null, dbUser);
			});
		});	
}));

passport.serializeUser(function (user, done) {
	return done(null, user.id); 
});

passport.deserializeUser(function (id, done) {
	//check status of account in the users table
	//if the user still has an account -> how to check if has an account? are users hard deleted? or lazy deleted?
	//	done(null, user);
	//if the user does not have an account
	//	delete the session key from redis, req.logout?
	//	done(null, false);
	//	
	//	lazy delete! auto active on login 
	//	
	//check status of account in the users table
	Databse.getUserById(id)
		.then(function (dbUser) {
			if (!dbUser) {
				req.logout();
				return done(null, false);
			}
			return done(null, dbUser);
		})
		.catch(done);
});


app.use(passport.initialize());
//looks at req.session and pulls data off of it and sets on req.user
app.use(passport.session());

app.use(express.static(__base + 'static'));

// 8080
// app.get('/', function (req, res) {
// 	res.send('Hello from lynx');
// });

// public
app.post('/login', passport.authenticate('local'), function (req, res) {
	res.json({message: 'Authenticated'});
});

// public
app.get('/logout', function (req, res) {	
	req.logout();			
	res.redirect('/');
});

// public
app.post('/signup', function (req, res, next) {
	//might want to do error checking
	//posts new username and new password and other info -> new user obj
	//field validation will be done on the client.

	bcrypt.hash(req.body.password, 10, function (err, passwordHash) {
		if (err) return next(err);
		// if username is already in db, returns error
		// if not, adds new user to db, returns user information
		Database.addUser(req.body.displayname, req.body.username, passwordHash)
			.then(user => {
				// user contains id, displayname, email, passwordhash 
				req.body = user; //? are ^ fields okay?
				req.login(req.body); //does req.login() look for 'username' & 'password'?
				res.json({message: 'signed up'});
			})
			.catch(next);
	});
});

// Ensures that only authenticated users can reach the api calls after this point
app.use(function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(401).json({message: 'Must sign in.'});		
	}
});

// authenticated users only = private
app.get('/api/users/me', function (req, res) {
	res.json(req.user);
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	// always have json coming back? send back json
	res.status(err.status || 500).send({message: err.message});
});

// populate the display
app.get('api/categories', function (req, res) {
	Database.getCategories(req.user.id)
		.then(rows => res.json(rows))
		.catch(next);
});

app.get('api/domains', function (req, res) {
	Database.getDomains(req.user.id)
		.then(rows => res.json(rows))
		.catch(next);
});

app.get('api/friends', function (req, res) {
	Database.getFriends(req.user.id)
		.then(rows => res.json(rows))
		.catch(next);
});

app.get('api/recievedMessages', function (req, res) {
	Database.getRecievedMessages(req.user.id)
		.then(rows => res.json(rows))
		.catch(next);
});

app.get('api/sentMessages', function (req, res) {
	Database.getSentMessages(req.user.id)
		.then(rows => res.json(rows))
		.catch(next);
});

// new message
app.post('api/newMessage', function (req, res) {
	//into is in req.body
});

var server = app.listen(80, function () {
	console.log('listening at http://localhost:80');
});


// testing the Database object
// Database.getUserByEmail('enagmail.com')
// 	.then(rows => {
// 		console.log('testing getUserByEmail w/ valid email : ');
// 		console.log(rows);
// 	});

// Database.getUserByEmail('notValidemail')
// 	.then(rows => {
// 		console.log('testing getUserByEmail w/ invalid email :');
// 		console.log(rows);
// 	});

// Database.getUserById(1)
// 	.then(rows => {
// 		console.log('testing getUserById w/ valid id :');
// 		console.log(rows);
// 	});

// Database.getUserById(-1)
// 	.then(rows => {
// 		console.log('testing getUserById w/ invalid id :');
// 		console.log(rows);
// 	});

// Database.getCategories(1)
// 	.then(rows => {
// 		console.log('testing getCategories w/ valid userId');
// 		console.log(rows);
// 	})
// 	.catch(err => console.log(err));

// Database.getCategories(-1)
// 	.then(rows => {
// 		console.log('testing getCategories w/ invalid userId');
// 		console.log(rows);
// 	});

// Database.getDomains(-1)
// 	.then(rows => {
// 		console.log(rows)
// 	});

// Database.getFriends(1)
// 	.then(rows => {
// 		console.log(rows);
// 	});

// Database.getSentMessages(1)
// 	.then(rows => console.log(rows));

//user already exists
// Database.addUser('enamark', 'enagmail.com', 'dskhfkjdsh')
// 	.then(rows => console.log(row))
// 	.catch(err => console.log(err));

// Database.addUser('ena3', 'ena2@gmail.com', 'sdkhjgkjdfhgkdf')
// 	.then(rows => console.log(rows))
// 	.catch(err => console.log(err));

// adding domain that already exists
// Database.addDomain('facebook')
// 	.then(rows => console.log(rows))
// 	.catch(err => console.log(err));

// //Adding new domain
// Database.addDomain('google')
// 	.then(rows => console.log(rows))
// 	.catch(err => console.log(err));

// adding category that already exists
// should return the id 
Database.addCategory('funny')
	.then(rows => console.log(rows))
	.catch(err => console.log(err));

Database.addCategory('cute')
	.then(rows => console.log(rows))
	.catch(err => console.log(err));


