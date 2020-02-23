var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Session = require('./Routes/Session.js');
var Validator = require('./Routes/Validate.js');
var dbCnn = require('./Database/dbCnn.js');
var createError = require('http-errors');

var async = require('async');

var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

//app.use(bodyParser.json({limit: '10mb', extended: true}));
//app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cookieParser());

// subroutes
app.use('/Usr', require('.Routes/User.js'));
app.use('/Ssns', require('.Routes/Sesh.js'));


// Set up Session 
app.use(Session.router);

// check for login. 
// If login is good add a Validator, or send 401 back
app.use(function(req, res, next){
    if(req.session || (req.method === 'POST' && (req.path === '/Usr' || req.path === '/Ssns'))){
        req.validator = new Validate(req, res);
        next();
    }
    else
        res.status(401).end();
});

// create the database connection 
app.use(dbCnn.router);

// debugging route used for database DELETE, clears all the tables 
// and reinserts a single admin user
app.delete('/DB', function(req, res){
    var tables = ["User"].map(function(tableName){
        return function(cb){
            req.cnn.query("delete from" + tableName, cb);
            req.cnn.query("alter table" + tableName + "auto_increment = 1", cb);
        };
    });
    //add admin user after tables are cleared
    tables.push(function(cb){
        req.cnn.query("INSERT INTO User (email, firstName, lastName, password, role, grade)" +
        'VALUES ("jdebest@email.com”, “Josh”, “DeBest”, “password”, 2, null);', cb);
    });
    // delete all sessions
    tables.push(function(cb){
        for (var sesh in Session.sessions)
            delete Session.sessions[sesh];
        cb();
    });
    if (req.validator.checkAdmin()){
        async.series(cbs, function(err){
            if(err)
                res.status(400).json(err);
            else res.status(200).end();
            req.cnn.release();
        });
    }
    else{
        req.cnn.release();
    }
});

// catch 404 errors
app.use(function(req, res, next){
    next(createError(404));
});

// Error handler
app.use(function(err, req, res, next){
    res.status(err.status || 500).json(err);
});

module.exports = app;