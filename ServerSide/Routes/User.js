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
           .chain(body.grade !== "", tags.missingField, ["grade"])){
                req.cnn.query('SELECT * from User where email = ?', body.email, (err, dupUser) => {
                    if (dupUser.length > 0){
                        vld.errors.push({tag : tags.dupRegistration, params : null});
                        vld.res.status(400).json(vld.errors);
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

/*    async.waterfall([
        function(cb){
            // make sure all fields are filled in
            if (vld.chain(body.email !== "", tags.missingField, ["email"])
                    .chain(body.firstName !== "", tags.missingField, ["firstName"])
                    .chain(body.lastName !== "", tags.missingField, ["lastName"])
                    .chain(body.password !== "", tags.missingField, ["password"])
                    .chain(body.role !== "", tags.missingField, ["role"])
                    .chain(body.grade !== "", tags.missingField, ["grade"])){
                req.cnn.query('SELECT * from User where email = ?', body.email, cb)
            }
        },
        function(dupUser, fields, cb){
         //   if (validate.errorCheck(body.role === 0 || body.role === 1, tags.permissionError, undefined, cb) &&
           //     validate.errorCheck(!dupUser.length, tags.duplicateEmail, null, cb)){
            console.log("pls");
            req.cnn.query('insert into User set ?', req.body, cb);
            console.log("nooooo");

              //      'insert into User (email, firstName, lastName, password, role, grade)'+
              //      'VALUES (" jdebest@email.com ", "Josh", "DeBest", "password", 2, null);

               // }
        }],
        function(result, fields, cb){
            console.log("test");
            res.location(router.baseURL + '/signup').end();
            cb();
        }],
        function(err){
            console.log("hellur");
            req.cnn.release();
        });
});*/

router.put('/:usrID', function(req, res){
    var body = req.body;
    var validate = req.validate;
    var sesh = req.session;

    async.waterfall([
        function(cb){
            if (validate.checkUsr(parseInt(req.params.usrID), cb)){
                if(validate.errorCheck( !("password" in req.body) || body.password !== null
                   && body.password !== "", tags.badValue, ["password"], cb)
                   
                   .errorCheck(!("password" in req.body) || (("password" in req.body) && 
                    ("oldPassword" in req.body) && (req.body.oldPassword !== "")) || 
                    ssn.checkAdmin(), Tags.noOldPassword, null, cb)) {
                        req.cnn.checkQuery('SELECT * from User where id = ?', req.params.usrID, cb);
                    }
            }
        },
        function(result, cb){
            if (validate.errorCheck(body.password && result[0].password === body.oldPassword
                || body.password && sesh.checkAdmin() || !body.password, tags.oldPwdIncorrect, null, cb)){

                    delete body.oldPassword;
                    req.cnn.checkQuery('UPDATE User set ? where id = ?', [req.body, req.params.usrID], cb);
                }
        },
        function(cb){
            cb();
        }],
        function(err){
            req.cnn.release();
            if (!err)
                res.status(200).end();
        });
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