import * as API from '../api';

export function signUp(cred, cb){
   return (dispatch, prevState) => {
      API.signUp(cred)
      .then((newUser) => dispatch({type: 'SIGN_UP', User: newUser}))
      .then(() => {
         if (cb) cb();
      }).catch(err => {
         dispatch({type: 'LOGIN_ERROR', description: err});
         console.log('Error is ', err)
      });
   };
}

export function signIn(cred, cb) {  
   return (dispatch, prevState) => {
      API.logIn(cred)
      .then((userInfo) => dispatch({type: 'LOGIN', user: userInfo}))
      .then(() => {if (cb) cb();})
      .catch(err => {console.log('err is',err);dispatch({type: 'LOGIN_ERR', 
       details: err})});
      
   };
}