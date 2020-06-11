import * as API from '../api';

export function register(new_user, cb){
   return (dispatch, prevState) => {
      API.register(new_user)
      .then((userInfo) => dispatch({type: 'SIGNUP', user: userInfo}))
      .then(() => {if (cb) cb();})
      .catch(err => {console.log('err is',err);
      dispatch({type: 'SIGNUP_ERROR', details: err})
      });
   };
}

export function logIn(cred, cb) {  
   return (dispatch, prevState) => {
      API.logIn(cred)
      .then((userInfo) => dispatch({type: 'LOGIN', user: userInfo}))
      .then(() => {if (cb) cb();})
      .catch(err => {console.log('err is',err);
      dispatch({type: 'LOGIN_ERROR', details: err})});
   };
}

export function displayUsers(cb){
   return (dispatch, prevState) => {
      API.getUsers()
      .then(res => dispatch({ type: 'UPDATE_USERS', users: res }))
      .then(res =>{ if(cb) cb(res);});
   };
}

export const insertToken = (email) => dispatch => {
   let token
   if (email) {
     token = email
     dispatch({
       type: 'INSERT_TOKEN_SUCCESS',
       payload: token
     })
   } else {
     dispatch({
       type: 'INSERT_TOKEN_FAIL'
     })
   }
 }

 export function clearErrors(cb) {
  return (dispatch, prevState) => {
     dispatch({type: 'CLEAR_ERRS'});
     if (cb)
        cb();
  };
}