var crypto = require('crypto');
var ssnDuration = 108000000;  // 3 hour duration
var name = 'debestAuth';
var sessionByCookie = {}; // All current sessions, user is logged in
var sessionArray = [];

var Session = function(user, res){
    var token = crypto.randomBytes(16).toString('hex');
    res.cookie(name, token, {maxDuration : ssnDuration, httpOnly : true});
    //res.cookie(token);
    sessionByCookie[token] = this;
    sessionArray.push(this);

    this.id = sessionArray.length - 1;
    this.cookie = token;
    this.loginTime = new Date().getTime();
    this.authToken = token;
    this.usrID = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.role = user.role;
    this.grade = user.grade;
}

Session.prototype.isAdmin = function(){
    return this.role === 2;
}
Session.prototype.logout = function(){
    delete sessionArray[this.id];
    delete sessionByCookie[this.authToken];
}

Session.findSession = token => sessionByCookie[token];
Session.getIDs = () => Object.keys(sessionByCookie);

Session.getSsnsArray = function(){
    return sessionArray;
}

// find any Session based on cookie
// if session timed out delete session, or attach Session to the req
var router = function(req, res, next){
    var cookie = req.cookies[name];
    var session = cookie && sessionByCookie[cookie];
    if (session){
        // check for session timeout
        if (session.loginTime < new Date().getTime() - ssnDuration)
            session.logout;
        else
            req.session = session;
    }
    next();
};

module.exports = {Session, router};