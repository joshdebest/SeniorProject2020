var mysql = require('mysql');

// dbCnns is an object that holds the pool of database connections
var dbCnns = function(){
    var config = require('./connection.json');
    config.connectionLimit = 15;  // ??
    this.pool = mysql.createPool(config);
};

// Creating one dbCnns object for the app
dbCnns.singleton = new dbCnns();

dbCnns.prototype.getConnection = function(cb){
    this.pool.getConnection(cb);
}

// creates the connection
dbCnns.router = function(req, res, next){
    console.log("getting connection");
    dbCnns.singleton.getConnection(function(err, cnn){
        if (err)
            res.status(500).json('Failed to connect to database' + err);
        else {
            console.log("Successful DB connection");
            cnn.checkQuery = function(testQuery, params, cb){
                this.query(testQuery, params, function(err, result, fields){
                    if(err)
                        res.status(500).json('Failed query' + testQuery);
                    cb(err, result, fields);
                });
            };
            req.cnn = cnn;
            next();
        }
    });
};

module.exports = dbCnns;