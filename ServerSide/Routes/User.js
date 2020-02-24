const async = require('async');
const express = require('express');
const tags = require('./Validate.js').tags;
const mysql = require('mysql');
const router = express.Router();

//router.baseURL = '/Usr';

router.post('/signup', function(req, res){
    var body = req.body;
    var validate = req.validate;
    body.registerTime = new Date();

    async.waterfall([
        function(cb){
            // make sure all the fields are filled in
            if (validate.chain(body.email !== "", tags.missingField, ["email"])
            .chain(body.firstName !== "", tags.missingField, ["firstName"])
            .chain(body.lastName !== "", tags.missingField, ["lastName"])
            .chain(body.password !== "", tags.missingField, ["password"])
            .chain(body.role !== "", tags.missingField, ["role"])
            .errorCheck(body.role !== 2, tags.prohibitedRegister, ["role"])){
                req.cnn.checkQuery('SELECT * from User where email = ?', body.email, cb)
            }
        },
        function(dupUser, cb){
            if (validate.errorCheck(body.role === 0 || body.role === 1 || req.session.checkAdmin(), tags.permissionError, undefined, cb) &&
                validate.errorCheck(!dupUser.length, tags.duplicateEmail, null, cb)){

                    req.cnn.checkQuery('INSERT into User set ?', body, cb);
                }
        },
    ],
        function(err){
            req.cnn.release();
        });
});

router.put('/:id', function(req, res){
    var body = req.body;
    var validate = req.validate;
    var sesh = req.session;

    async.waterfall([
        function(cb){
            if (validate.checkUsr(parseInt(req.params.id), cb)){
                if(validate.errorCheck( !("password" in req.body) || body.password !== null
                   && body.password !== "", tags.badValue, ["password"], cb)
                   
                   .errorCheck(!("password" in req.body) || (("password" in req.body) && 
                    ("oldPassword" in req.body) && (req.body.oldPassword !== "")) || 
                    ssn.checkAdmin(), Tags.noOldPassword, null, cb)) {
                        req.cnn.checkQuery('SELECT * from User where id = ?', req.params.id, cb);
                    }
            }
        },
        function(result, cb){
            if (validate.errorCheck(body.password && result[0].password === body.oldPassword
                || body.password && sesh.checkAdmin() || !body.password, tags.oldPwdIncorrect, null, cb)){

                    delete body.oldPassword;
                    req.cnn.checkQuery('UPDATE User set ? where id = ?', [req.body, req.params.id], cb);
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

router.get('/:id', function(req, res){
    var validate = req.validate;
    async.waterfall([
        function(cb){
            if(validate.checkUsr(parseInt(req.params.id), cb))
                req.cnn.checkQuery('SELECT * User where id = ?', req.params.id, cb);
        },
        function(userArray, cb){
            if(validate.errorCheck(userArray.length, tags.userNotFound, undefined, cb)){
                delete userArray.password;  // to keep password hidden
                res.json(userArray);    // return the array of users
                cb();
            }
        }
    ],
    function(err){
        req.cnn.release();
    });

});

router.delete('/:id', function(req, res){
    var valid = req.validate;
    async.waterfall([
        function(cb){
            if(valid.checkAdmin()){
                req.cnn.checkQuery('SELECT * User where id = ?', req.params.id, cb);
            }
            else{
                req.cnn.release();
                return;
            }
        },
        function(userArray, cb){
            if (valid.errorCheck(userArray.length, tags.userNotFound, undefined, cb)){
                req.cnn.checkQuery('DELETE from User where id = ?', req.params.id, cb);
            }
        },
        function(userArray, cb){
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