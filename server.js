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

passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
	Database.getUserByEmail(email)
		.then(function (dbUser) {	
			
			if (!dbUser) return done(null, false, {message: 'Incorrect credentials.'});

			bcrypt.compare(password, dbUser.passwordHash, function (err, matches) {
				console.log('comparing passwords');
				if (err) return done(err);			
				console.log('no error');
				if (!matches) return done(null, false, {message: 'Incorrect credentials'});

				console.log('password is good, life is good');
				return done(null, dbUser);
			});
		})
		.catch(err => console.log(err));
}));

passport.serializeUser(function (user, done) {
	return done(null, user.id); 
});

passport.deserializeUser(function (id, done) {

	Database.getUserById(id)
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

// public
app.post('/api/signin', passport.authenticate('local'), function (req, res) {
	res.json({message: 'Authenticated'});
});

// public
app.get('/api/signout', function (req, res) {	
	req.logout();		
	res.json({message: 'You have been logged out.'});
	// res.redirect('/');
});

// public
app.post('/api/signup', function (req, res, next) {
	//might want to do error checking
	//posts new username and new password and other info -> new user obj
	//field validation will be done on the client.

	bcrypt.hash(req.body.password, 10, function (err, passwordHash) {
		if (err) return next(err);
		// if username is already in db, returns error
		// if not, adds new user to db, returns user information
		Database.addUser(req.body.displayName, req.body.email, passwordHash)
			.then(user => {				
				req.body = user; 
				req.login(req.body, err => {
					if (err) return next(err);
					res.json({message: 'signed up'});
				}); 
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

var usersApi = require(__base + 'routes/user-api.js'),
	categoryApi = require(__base + 'routes/category-api.js'),
	domainApi = require(__base + 'routes/domain-api.js'),
	messageApi = require(__base + 'routes/message-api.js');



app.use('/api/user', usersApi.Router(Database));
app.use('/api/category', categoryApi.Router(Database));
app.use('/api/domain', domainApi.Router(Database));
app.use('/api/message', messageApi.Router(Database));


app.use(function (err, req, res, next) {
	console.error(err.stack);
	// always have json coming back? send back json
	res.status(err.status || 500).send({message: err.message});
});

var server = app.listen(80, function () {
	console.log('listening at http://localhost:80');
});



// bcrypt.hash('ena', 10, function (err, passwordHash) {
// 	console.log('ena -> ' + passwordHash);
// });	

// bcrypt.hash('alex', 10, function (err, passwordHash) {
// 	console.log('alex -> ' + passwordHash);
// });	

// bcrypt.hash('amy', 10, function (err, passwordHash) {
// 	console.log('amy -> ' + passwordHash);
// });	

// bcrypt.hash('jeff', 10, function (err, passwordHash) {
// 	console.log('jeff -> ' + passwordHash);
// });	

// bcrypt.hash('stearns', 10, function (err, passwordHash) {
// 	console.log('stearns -> ' + passwordHash);
// });	
