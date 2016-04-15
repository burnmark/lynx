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

passport.use(new LocalStrategy(function (username, password, done) {
	console.log(username, password);
	//check if the username is in the database - get all the info back
	//if user name is not in db
	//	done(null, false)
	//check password against hash in db, if no match
	//must use bcrypt to hash the password
	//	done(null, false)
	//if matches
	//	done(null, info from db)
	Database.getUserByUsername(username)
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
	// store only the primary key for the user in the user object ?
	// or store all data?
	// which is more important, speed or consistency?
	// 	speed might be better... user information stored in db includes:
	// 		id, displayname, email, and passwordhash
	// 	these are things that are not likely to change.
	return done(null, user.id); //does "done" set the req.session object?
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
	// if (!req.isAuthenticated()) {
		req.logout();		
	// }
	res.redirect('/');
});

// public
app.post('/signup', function (req, res, next) {
	//might want to do error 
	//posts new username and new password and other info -> new user obj
	//must validate these fields (like password)
	//check if username is already in the db
	//signal did something wrong: 
	// 	var err = new Error('error'); <- captures stack trace
	// 	err.status = 400
	//	next(err);
	
	//insert new record into db
	//get back new id value
	//req.body = new data
	//req.login(req.body)
	//res.json({message: 'signed up'});
});

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

//the session secret for express
console.log(cookieSigSecret);

app.use(function (err, req, res, next) {
	console.error(err.stack);
	// always have json coming back? send back json
	res.status(err.status || 500).send({message: err.message});
});

var server = app.listen(80, function () {
	console.log('listening at http://localhost:80');
});

