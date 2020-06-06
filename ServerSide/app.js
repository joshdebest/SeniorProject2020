var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Session = require('./Routes/Session.js');
var Validate = require('./Routes/Validate.js');
var dbCnns = require('./Database/dbCnns.js');
var createError = require('http-errors');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log("Handling " + req.method + '/' + req.path);
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
    res.header("Access-Control-Expose-Headers", "Location");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Headers", "Accept, Accept-Encoding, Accept-Language, Access-Control-Request-Headers, Access-Control-Request-Method, Cache-Control, Connection, Content-Length, Content-Type, Pragma, Host, Origin, Referer, User-Agent");

    next();
 });

app.options("/*", function(req, res) {
    res.status(200).end();
});

app.use(bodyParser.json());
app.use(cookieParser());

// Set up Session 
app.use(Session.router);

// check for login. 
// If login is good add a Validator, or send 401 back
app.use(function(req, res, next){
    console.log(req.path);
    if(req.session || (req.method === 'POST' &&  
      (req.path === '/Ssns/login' || req.path === '/Usr/register'))){
        req.validate = new Validate(req, res);
        next();
    }
    else
        res.status(401).end();
});

// create the database connection 
app.use(dbCnns.router);

// subroutes
app.use('/Usr', require('./Routes/User.js'));
app.use('/Ssns', require('./Routes/Sesh.js'));

// debugging route used for database DELETE, clears all the tables 
// and reinserts a single admin user
app.delete('/DB', function(req, res){
    req.cnn.query('delete from User;');
    req.cnn.query('alter table User auto_increment = 1;');
    req.cnn.query('insert into User (email, firstName, lastName, password, role, grade) VALUES ("jdebest@email.com", "Josh", "DeBest", "password", 2, null);');

    req.session.logout();
    res.status(200).end();
    req.cnn.release();
});

app.use(function(req, res, next){
    //next(createError(404));
    res.status(404).end();
    req.cnn.release();
});

// Error handler
app.use(function(err, req, res, next){
    //res.status(err.status || 500).json(err);
    res.status(500).json(err.stack);
    req.cnn && req.cnn.release();
});

var port;
 if (process.argv.length > 2) {
    if (process.argv[2] === "-p") {
       port = process.argv[3];
    }
 }
 
 app.listen(port, function() {
    console.log('App Listening on port ' + port);
 });
