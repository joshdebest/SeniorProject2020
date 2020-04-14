var express = require('express');
var async = require('async');
var tags = require('./Validate.js').tags;
var {Session, router} = require('./Session.js');
var router = express.Router({caseSensitive: true});
router.baseURL = '/Ssns';

// get an array of active sessions, must be an admin
router.get('/', function(req, res){
    var sesh;
    var body = [];
    if (req.validate.checkAdmin()){
        Session.getIDs().forEach(id => {
            sesh = Session.findSession(id);
            body.push({id: sesh.id, usrID: sesh.usrID, loginTime: sesh.loginTime});
        });
        res.status(200).json(body);
        req.cnn.release();
    }
    else{
        res.status(400).end();
        req.cnn.release();
    } 
});


// gets a specific session
router.get('/:cookie', function(req, res){
    var getSsn = Session.findSession(req.params.cookie);

    if (getSsn === undefined){
        res.status(400).end();
    }
    else if (req.validate.checkUsr(getSsn.email)){
        res.status(200).json({id : getSsn.id, usrID : getSsn.usrID, loginTime : getSsn.loginTime});
    }
    req.cnn.release();
});

// create a new session
router.post('/login', function(req, res){
    var sesh;
    req.cnn.checkQuery('SELECT * from User where email = ?', [req.body.email],
        function(err, result){
            if(req.validate.errorCheck(result && result.length && result[0].password === req.body.password, tags.failedLogin)){
                sesh = new Session(result[0], res);
                res.location(router.baseURL + '/login').status(200).end();
            }
            req.cnn.release();
        });
});

// delete a session (id), logout
router.delete('/:cookie', function(req, res){
    var currSsn = Session.findSession(req.params.cookie);
    if (currSsn === null) console.log("currSsn");
    var vld = req.validate;

    async.waterfall([
        function(cb){
            if (currSsn.usrID === vld.session.usrID){                
                currSsn.logout();
                cb();
            }
        }
    ],
    function(err){
        req.cnn.release();
        if(!err)
            res.status(200).end();
    });
});

module.exports = router;