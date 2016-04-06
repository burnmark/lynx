// What other node libraries should be used?
var express = require('express'),
	app = express(),
	bcrypt = require('bcrypt'),
	bodyParser = require('bodyParser'),
	session = require('express-session'),
	RedisStore = require('connect-redis')(session),
	morgan = require('morgan'),
	mysql = require('mysql'),
	connection = mysql.createConnetion({

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
})