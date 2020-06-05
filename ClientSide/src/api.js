// Interface to the REST server

import { Register } from "./components/components";

const baseURL = "http://localhost:3001/";
//const baseURL = "http://www.debestrobotics.com/";

var currSessionCookie;
var sessionId;

const headers = new Headers();
headers.set('Content-Type', 'application/JSON');
const reqConf = {
   headers: headers,
   credentials: 'include',
};

function myFetch(method, endpoint, body){
   return fetch(baseURL + endpoint, {
      method: method,
      body: (body ? JSON.stringify(body) : undefined),
      ...reqConf
   }).then(response => {
      if (response.ok) {
         return response;
      } else
         return response.json().then(rsp => Object.values(rsp)
          .map(e => errorTranslate(e.tag)))
          .then(errors => {throw errors});
      }).catch(err => {let temp = err.toString().indexOf('Type') !== -1 ? 
      [(errorTranslate('queryFailed'))] :  err; throw temp});  
}

export function post(endpoint, body){
   return myFetch('POST', endpoint, body);
}
// GET/Usr/{email}
export function get(endpoint, body){
   return myFetch('GET', endpoint, body);
}
// GET/Usr 
//export function get(endpoint){
//   return myFetch('GET', endpoint);
//}

export function put(endpoint, body){
   return myFetch('PUT', endpoint, body);
}
export function del(endpoint){
   return myFetch('DELETE', endpoint);
}

//  Functions for api requests

export function logIn(creds){
   console.log(creds);
   return post('Ssns/login', creds).then((res) => res.json())
   .catch(err => []);
}

export function logOut(){
   return del('Ssns/' + currSessionCookie).catch(err => {throw err});
}

/*export function logIn(cred) {
   return post("Ssns", cred).then(rsp => cred).catch(err => {throw err});
       .then(response => {
         let location = response.headers.get("Location").split('/');
         sessionId = location[location.length - 1];
         console.log("Got session " + sessionId);
         return get("Ssns/" + sessionId)
      })
      .then(response => response.json())   // ..json() returns a Promise!
      .then(rsp => get('Prss/' + rsp.prsId))
      .then(userResponse => userResponse.json())
      .then(rsp => rsp[0])
      .catch(err => {console.log('err was this',err);throw err})  
}*/

/**
 * Register a user
 * @param {Object} User info
 * @returns {Promise resolving to new user registration}
 */
export function register(newUser){
   return post('Usr/register', newUser).then((res) => res.json()).catch(err => {throw err});
}

/**
 * @param User email to index database
 * @returns {Promise} json parsed data
 */
export function getUser(email) {
   return get ('Usr/' + email)
   .then(res => res.json())
   .catch(err => {throw err});
}

export const errMap = {
   en: {
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
      prohibitedField : "prohibitedField" 
   },
   es: {
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
      prohibitedField : "prohibitedField" 
   }
}

/**
 * @param {string} errTag
 * @param {string} lang
 */
export function errorTranslate(errTag, lang = 'en') {
   return errMap[lang][errTag] || 'Unknown Error!';
}

