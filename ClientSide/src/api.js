// Interface to the REST server

const baseURL = "http://localhost:3001/";
//const baseURL = "http://www.debestrobotics.com/";

var currSessionCookie;
var sessionId;

const headers = new Headers();
headers.set('Content-Type', 'application/JSON');

function myFetch(method, endpoint, body){
   return fetch(baseURL + endpoint, {
      method: method,
      body: (body ? JSON.stringify(body) : null),
      headers: headers,
      credentials: 'include'
   }).catch(err => {throw err});
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

/**
 * Register a user
 * @param {Object} User info
 * @returns {Promise resolving to new user registration}
 */
export function signUp(info){
   return post('Usr', info).catch(err => {throw err});
}

export function templogIn(creds){
   return post('Ssns', creds).catch(err => {throw err});
}

export function logOut(){
   return del('Ssns/' + currSessionCookie).catch(err => {throw err});
}

export function logIn(cred) {
   return post("Ssns", cred)
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
