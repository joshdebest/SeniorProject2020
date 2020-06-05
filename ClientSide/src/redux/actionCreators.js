import * as API from '../api';

export function register(new_user, cb){
   return (dispatch, prevState) => {
      API.register(new_user)
      .then(() => {if (cb) cb();
      }).catch(err => {dispatch({type: 'REGISTER_ERROR', description: err});
      });
   };
}

export function logIn(cred, cb) {  
   return (dispatch, prevState) => {
      API.logIn(cred)
      .then((userInfo) => dispatch({type: 'LOGIN', user: userInfo}))
      .then(() => {if (cb) cb();})
      .catch(err => {console.log('err is',err);dispatch({type: 'LOGIN_ERR', 
       details: err})});
      
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