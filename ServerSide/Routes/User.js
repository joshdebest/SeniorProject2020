var async = require('async');
var express = require('express');
var tags = require('./Validate.js').tags;
var {Session, router} = require('./Session.js');
var router = express.Router({caseSensitive: true});
router.baseURL = '/Usr';

router.post('/signup', function(req, res){
    var body = req.body;
    var vld = req.validate;
    var sesh;
    //body.signupTime = new Date();

    if (vld.chain(body.email !== "", tags.missingField, ["email"])
           .chain(body.firstName !== "", tags.missingField, ["firstName"])
           .chain(body.lastName !== "", tags.missingField, ["lastName"])
           .chain(body.password !== "", tags.missingField, ["password"])
           .chain(body.role !== "", tags.missingField, ["role"])
           .chain(body.grade !== null && (body.role !== 1 || body.role !== 2), tags.missingField, ["grade"])
           .chain(body.grade !== "" && (body.role !== 1 || body.role !== 2), tags.missingField, ["grade"])){
                req.cnn.query('SELECT * from User where email = ?', body.email, (err, dupUser) => {
                    if (dupUser.length > 0){
                        vld.errors.push({tag : tags.duplicateEmail, params : null});
                        vld.res.status(400).json(vld.errors);
                    }
                    // if a user is logged in and tries to make another account
                    else if(req.session){
                        vld.errors.push({tag : tags.prohibitedRegister, params : null});
                        vld.res.status(401).json(vld.errors);
                    }
                    else {
                        req.cnn.query('insert into User set ?', req.body, (err, result) => {
                            if(err) throw err;
                            sesh = new Session(req.body, res);
                            res.location(router.baseURL + '/signup').status(200).end();
                        });
                    }
                    req.cnn.release();
                });
    }
});

router.put('/', function(req, res){
    console.log("Hello");

    var body = req.body;
    var validate = req.validate;
    var sesh = req.session;
    var email = req.query.email;

    if (!("password" in req.body) || body.password === ""){
        validate.errors.push({tag : tags.badValue, params : "password"});
        validate.res.status(400).json(validate.errors);    
    }
    else if (!(req.body.oldPassword) || req.body.oldPassword === ""){
        validate.errors.push({tag : tags.noOldPassword, params : "old password"});
        validate.res.status(400).json(validate.errors); 
    }
    else{
        req.cnn.query('SELECT * from User where email = ?', email, (err, result) => {
            if(err) throw err;
            //if((body.password && result[0].password !== body.oldPassword) || (body.password && !(sesh.checkAdmin()))){
            //if(result[0].password !== body.oldPassword || body.password && !(sesh.checkAdmin())){
            if(result[0].password !== body.oldPassword){
                validate.errors.push({tag : tags.oldPwdIncorrect, params : result[0].password});
                validate.res.status(400).json(validate.errors); 
            }
            else{
                req.cnn.query('UPDATE User set ? where email = ?', [req.body, email], (err, updated) => {
                   // req.cnn.release();
                    if (!err)
                        res.status(200).end();
                });
            }
        });
    }
    req.cnn.release();
});


router.get('/', function(req, res){
    var email = req.body.email;
    if(req.session.checkAdmin()){
        req.cnn.query('select id, email from User', null, (err, userArray) => {
            res.json(userArray);
            req.cnn.release();
        });
    }
    else if (email && !req.session.checkAdmin()){
        req.cnn.query('select id, email from User where email = ?',  email, (err, one_user) => {
            if(err) throw err;
            res.json(one_user);
            req.cnn.release();
        });
    }
    else{
        req.cnn.query('select id, email from User where id = ?', req.session.usrID, (err, result) =>{
            if(err) throw err;
            res.json(result);
            req.cnn.release();

        });
    }

});

router.get('/:usrID', function(req, res){
    var validate = req.validate;
    async.waterfall([
        function(cb){
            if(validate.checkUsr(parseInt(req.params.usrID), cb))
                req.cnn.checkQuery('SELECT * User where id = ?', req.params.usrID, cb);
        },
        function(userArray, cb){
            if(validate.errorCheck(userArray.length, tags.userNotFound, undefined, cb)){
                delete userArray[0].password;  // to keep password hidden
                res.json(userArray);    // return the array of users
                cb();
            }
        }
    ],
    function(){
        req.cnn.release();
    });

});

router.delete('/:usrID', function(req, res){
    var valid = req.validate;
    async.waterfall([
        function(cb){
            if(valid.checkAdmin()){
                req.cnn.checkQuery('SELECT * User where id = ?', req.params.usrID, cb);
            }
            else{
                req.cnn.release();
                return;
            }
        },
        function(userArray, cb){
            if (valid.errorCheck(userArray.length, tags.userNotFound, undefined, cb)){
                req.cnn.checkQuery('DELETE from User where id = ?', req.params.usrID, cb);
            }
        },
        function(cb){
            cb('success');
        }],
        function(err){
            req.cnn.release();
            if (err === 'success' || !err)
                res.status(200).end();
        }
    );
});

module.exports = router;