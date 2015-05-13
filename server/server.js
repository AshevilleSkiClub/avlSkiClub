
/**
 * Module dependencies
 */

var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    errorHandler = require('express-error-handler'),
    morgan = require('morgan'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path');

var app = module.exports = express();


//connect to database
mongoose.connect('mongodb://localhost/asClub');


/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');


//set static files
app.use("/bower_components",express.static(path.join(__dirname,'../','app/','bower_components')));
app.use("/css",express.static(path.join(__dirname,'../','app/','content/styles')));
app.use("/img",express.static(path.join(__dirname,'../','app/','content/img')));
app.use("/components",express.static(path.join(__dirname,'../','app/','components')));
app.use("/calendar",express.static(path.join(__dirname,'../','app/','calendar')));
app.use("/home",express.static(path.join(__dirname,'../','app/','home')));
app.use("/gallery",express.static(path.join(__dirname,'../','app/','gallery')));
app.use("/app",express.static(path.join(__dirname,'../','app/')));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

// development only
if (env === 'development') {
    app.use(errorHandler());
}

// production only
if (env === 'production') {
    // TODO
}


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);



// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
