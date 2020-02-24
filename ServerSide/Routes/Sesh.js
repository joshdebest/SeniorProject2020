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
        Session.getIDs().foreach(id => {
            sesh = Session.findSession(id);
            body.push({id : sesh.id, cookie : sesh.token, usrID : sesh.usrID, loginTime : sesh.loginTime});
        });
        res.status(200).end();
        res.cnn.release();
    }
    else{
        res.status(400).end();
        res.cnn.release();
    } 
});

// gets a specific session
router.get('/:id', function(req, res){
    var currSsn = Session.findSession(req.params.id);
    
    if (req.validate.checkUsr(parseInt(currSsn.usrID)), cb){
        res.json({id : currSsn.id, cookie : currSsn.token, usrID : currSsn.usrID, loginTime : currSsn.loginTime});
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
                console.log("made it to login");
                res.location(router.baseURL + '/' + sesh.id).status(200).end();
            }
            req.cnn.release();
        });
});

// delete a session (id), logout
router.delete('/:id', function(req, res){
    var currSsn = Session.findSession(req.params.id);
    var vld = req.validate;

    async.waterfall([
        function(cb){
            if(vld.checkUsr(parseInt(currSsn.usrID), cb) && vld.errorCheck(currSsn, tags.sessionNotFound, undefined, cb)){
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