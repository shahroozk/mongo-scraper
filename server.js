var express = require('express');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var methodOverride = require('method-override');
var Promise = require('bluebird');
mongoose.Promise = Promise;

// Initialize Express
var app = express();

// Set the port
app.use(express.static(__dirname + '/public'));
var PORT = process.env.PORT || 3000;

// Use morgan logger for logging requests
app.use(logger('dev'));

// Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup engine for Handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


// Database
require("./config/connection");

//Routes
var routes = require('./controllers/news.js');
app.use('/',routes);

//404 Error
app.use(function(req, res) {
	res.render('404');
});

//Port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT);
});