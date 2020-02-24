var mysql = require('mysql');

// Holds the connection pool
var dbCnns = function(){
    var config = require('./connection.json');
    config.connectionLimit = dbCnns.PoolSize;
    this.pool = mysql.createPool(config);
};
dbCnns.PoolSize = 1;

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