// Creating a Validator object
var Validate = function(req, res){
    this.session = req.session;
    this.errors = [];  // Array of errors
    this.res = res;
};

Validate.tags = {
    failedQuery: "failedQuery",                 // Query failed (server problem)
    missingField : "missingField",              // Field missing from request. Params[0] gives field name
    badValue : "badValue",                      // Field has bad value. Params[0] gives field name
    userNotFound : "userNotFound",              // User not present in DB, occurs when the User doesn’t exist
    sessionNotFound : "sessionNotFound",
    permissionError : "permissionError",
    failedLogin : "failedLogin",                // Email and password combination invalid
    duplicateEmail : "duplicateEmail",          // Duplicate email provided
    prohibitedRegister : "prohibitedRegister",  // User tries to create an account while logged in
    noOldPassword : "noOldPassword",            // Change of password requires an old password
    oldPwdIncorrect : "oldPwdIncorrect",        // Old password that was provided is incorrect
    dupRegistration : "dupRegistration",        // Duplicate registration, User already exists
    prohibitedField : "prohibitedField"         // Field in body not allowed
};

Validate.prototype.errorCheck = function(checking, tag, params, cb){
    if (!checking)
        this.errors.push({tag : tag, params : params});
    if (this.errors.length > 0){
        if(this.res){
            if (this.errors[0].tag === Validate.tags.permissionError)
                this.res.status(403).end();
            else{
                console.log("errorcheck");
                this.res.status(400).end();
            }
            this.res = null;
        }
        if (cb)
            cb(this);
    }
    return (this.errors.length  === 0);
};

Validate.prototype.chain = function(checking, tag, params){
    if (!checking)
        this.errors.push({tag : tag, params : params});
    return this;
}

Validate.prototype.checkUsr = function(usrID, cb){
    return this.errorCheck(this.session && (this.session.checkAdmin || usrID === this.session.usrID),
                            Validate.tags.permissionError, null, cb);
};

Validate.prototype.checkAdmin = function(cb) {
    return this.errorCheck(this.session && this.session.checkAdmin(),
     Validate.tags.permissionError, null, cb);
 };

module.exports = Validate;