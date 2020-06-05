const initialState = {
   user_token: ''
 }
 
 export default function Token(state = initialState, action){
   switch (action.type) {
     case 'INSERT_TOKEN_SUCCESS':
       return {
         ...state,
         user_token: action.payload,
       }
     case 'INSERT_TOKEN_FAIL':
       return {
         ...state,
       }
     default:
       return state
   }
 }