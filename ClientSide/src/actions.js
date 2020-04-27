import * as API from './api';

export function signUp(cred, cb){
   return (dispatch, prevState) => {
      API.signUp(cred)
      .then((newUser) => dispatch({type: 'SIGN_IN', User: newUser}))
      .then(() => {
         if (cb) cb();
      }).catch(err => {
         dispatch({type: 'LOGIN_ERROR', description: err});
         console.log('Error is ', err)
      });
   };
}