var crypto = require('crypto');
var ssnDuration = 108000000;  // 3 hour duration
var name = 'debestAuth';
var sessionByCookie = {}; // All current sessions, user is logged in

var Session = function(user, res){
    var token = crypto.randomBytes(32).toString('hex');
    res.cookie(name, token, {maxDuration : ssnDuration, httpOnly : true});
    sessionByCookie[token] = this;
    this.loginTime = new Date().getTime();
    this.authToken = token;
    this.usrID = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.grade = user.grade;
}

Session.prototype.checkAdmin = function(){
    return this.role === 2;
}
Session.prototype.logout = function(){
    delete sessionByCookie[this.authToken];
}

// find any Session based on cookie
// if session timed out delete session, or attach Session to the req
var router = function(req, res, next){
    var cookie = req.cookies[name];
    var currSession = cookie && sessionByCookie[cookie];
    if (currSession){
        if (currSession.loginTime < new Date().getTime() - maxDuration)
            currSession.logout;
        else
            req.session = currSession;
    }
    next();
};

module.exports = {Session, router};