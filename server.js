// if "EADDRINUSE", do: $ sudo kill $(sudo lsof -t -i:80)
var express = require('express'),
	app = express(),
	bcrypt = require('bcrypt'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	morgan = require('morgan'),
	Maria = require('mariasql'),
	connection = new Maria({
		host: '127.0.0.1',
		user: 'host',
		password: '',
		db: 'lynx'
	}),
	passport = require('passport'),
	passportLocal = require('passport-local');

// 8080
app.get('/', function (req, res) {
	res.send('Hello from lynx');
});

//the session secret for express
console.log(process.env.SIGSECRET);

var server = app.listen(80, function () {
	console.log('listening at http://localhost:80');
});

