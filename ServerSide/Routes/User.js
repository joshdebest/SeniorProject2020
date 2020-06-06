var async = require('async');
var express = require('express');
var tags = require('./Validate.js').tags;
var {Session, router} = require('./Session.js');
var router = express.Router({caseSensitive: true});
router.baseURL = '/Usr';

router.post('/register', function(req, res){
    var body = req.body;
    var vld = req.validate;
    var sesh;
    //body.signupTime = new Date();

    if (body.role === 0 && body.grade === null ){
        vld.errors.push({tag : tags.missingField, params : ["grade"]});
        vld.res.status(400).json(vld.errors); 
    }

    async.waterfall([
        function(cb){
           if (vld.chain(body.email && body.email !== "", tags.missingField, ["email"])
            .chain(body.firstName && body.firstName !== "", tags.missingField, ["firstName"])
            .chain(body.lastName && body.lastName !== "", tags.missingField, ["lastName"])
            .chain(body.password && body.password !== "", tags.missingField, ["password"])           
            .chain(!req.session, tags.prohibitedRegister, null)
            .chain(body.grade !== "" && (body.role !== 1 || body.role !== 2), tags.missingField, ["grade"])
            .chain(body.role !== "", tags.missingField, ["role"])
            .errorCheck(body.role >= 0 && body.role <= 2, tags.badValue, ["role"], cb)){
                req.cnn.tryQuery('SELECT * from User where email = ?', body.email, cb)
            }
        },
        function(dupUsr, cb){
            if (vld.errorCheck(!dupUsr.length, tags.duplicateEmail, null, cb)){
                req.cnn.tryQuery('insert into User set ?', req.body, cb)
            }
        },
        function(result, cb){
            sesh = new Session(req.body, res);
            res.location(router.baseURL + '/signup').status(200).end();
            cb();
        }],
        function(err){
            req.cnn.release();
        });
});

router.put('/:email', function(req, res){
    var body = req.body;
    var vld = req.validate;
    var ssn = req.session;
    var email = req.params.email;

    async.waterfall([
        function(cb) {
            if (vld.checkUsr(req.params.email, cb)) {
              if (vld.errorCheck(!("password" in req.body) || body.password !== null 
                  && body.password !== "", tags.badValue, ['password'], cb) &&
                 // if role is changed it must be an admin
                  vld.chain(!(req.body.role) || ssn.isAdmin(), tags.badValue, ["role"], cb)
                  .chain(!req.body.email, tags.prohibitedField, ["email"], cb)
                   
                  // checking for oldPwd if non-admin
                  .errorCheck(!("password" in req.body) || (("password" in req.body) && 
                  ("oldPassword" in req.body) && (req.body.oldPassword !== "")) || ssn.isAdmin(), tags.noOldPassword, null, cb)) {

                    req.cnn.tryQuery('select * from User where email = ?', email, cb);
              }
           } 
        }, 
        function(result, cb) {
           if (vld.errorCheck(result.length, tags.userNotFound, null, cb) &&
                vld.errorCheck(body.password && result[0].password === body.oldPassword 
                || body.password && ssn.isAdmin() || !body.password, tags.oldPwdIncorrect, null, cb)) {
              
              delete req.body.oldPassword;
              req.cnn.tryQuery('UPDATE User set ? where email = ?', [req.body, email], cb);
           }
        }, 
        function(result, cb) {
           cb();
        }], 
        function(err) {
           req.cnn.release();
           if (!err) {
              res.status(200).end();
           }
        });
});

/*     if ("password" in req.body || body.password === "" && body.password === null){
        validate.errors.push({tag : tags.badValue, params : "password"});
        validate.res.status(400).json(validate.errors);    
    }
                 
    // checking for oldPwd if non-admin logged in
    else if (!("password" in req.body) || (("password" in req.body) && ("oldPassword" in req.body) && 
       req.body.oldPassword !== "") || ssn.isAdmin()){

        validate.errors.push({tag : tags.noOldPassword, params : "old password"});
        validate.res.status(400).json(validate.errors); 
    }
    // checking that non-admin doesn't change role
    else if (req.body.role && !(ssn.isAdmin())){
        validate.errors.push({tag: tags.badValue, params: "role"});
        validate.res.status(400).json(validate.errors); 
    }
    else{
        req.cnn.query('SELECT * from User where email = ?', email, (err, result) => {
            if(err) throw err;
            //if((body.password && result[0].password !== body.oldPassword) || (body.password && !(sesh.checkAdmin()))){
            //if(result[0].password !== body.oldPassword || body.password && !(sesh.checkAdmin())){
            if(result[0].password !== body.oldPassword && !(ssn.isAdmin())){
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
}); */

    // ------------------------------------

router.get('/', function(req, res){
    var email = req.query.email;
    if (email){
        req.cnn.query('select id, email from User where email = ?;',  email, (err, usrArr) => {
            if(req.session.isAdmin()){
                res.json(usrArr);
                req.cnn.release();
            }
            else{  
                var temp = [];
                usrArr.forEach(function(curr){
                    if (curr.email === req.session.email){
                        temp.push(curr);
                    }
                });
                res.json(temp);
                req.cnn.release();
            }
        });
    }
    else if(req.session.isAdmin()){
        req.cnn.query('select id, email from User;', null, (err, userArray) => {
            res.json(userArray);
            req.cnn.release();
        });
    }
    else {
        req.cnn.query('select id, email from User where email = ?;', req.session.email, (err, result) =>{
            if(err) throw err;
            var temp = [];
            result.forEach(function(curr){
                if (curr.email === req.session.email){
                    temp.push(curr);
                }
            });
            res.json(temp);
            req.cnn.release();
        });
    }
});

router.get('/:email', function(req, res){
    var validate = req.validate;
    var curr_ssn = req.session;

    console.log(curr_ssn.email);
    console.log(req.params.email);
    async.waterfall([
        function(cb){
            if (!(curr_ssn.isAdmin()) && (curr_ssn.email !== req.params.email)){
                validate.errors.push({tag: tags.permissionError, params: "unauthorized request"});
                validate.res.status(403).json(validate.errors);         
            }
            else if (validate.checkUsr(req.params.email, cb))
                req.cnn.tryQuery('SELECT * from User where email = ?;', req.params.email, cb);
        },
        function(userArray, cb){
            if(validate.errorCheck(userArray.length, tags.userNotFound, null, cb)){
                delete userArray[0].password;  // to keep password hidden
                res.json(userArray);    // return the users info
                cb();
            }
        }
    ],
    function(err){
        req.cnn.release();
    });

});

router.delete('/:email', function(req, res){
    var valid = req.validate;
    async.waterfall([
        function(cb){
            if(valid.checkAdmin()){
                req.cnn.tryQuery('SELECT * from User where email = ?', req.params.email, cb);
            }
            else{
                req.cnn.release();
                return;
            }
        },
        function(userArray, cb){
            if (valid.errorCheck(userArray.length, tags.userNotFound, undefined, cb)){
                req.cnn.tryQuery('DELETE from User where email = ?', req.params.email, cb);
            }
        },
        function(result, cb){
            cb();
        }],
        function(err){
            req.cnn.release();
            if (!err) {
                res.status(200).end();
           }
        }
    );
});

module.exports = router;