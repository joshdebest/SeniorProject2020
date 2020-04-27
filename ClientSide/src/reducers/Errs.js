export default function Errs(state = [], action) {
   switch(action.type) {
      case 'LOGIN_ERROR':
         return action.details;
      case 'SIGNUP_ERROR':
         return action.details;
      case 'CLEAR_ERRORS':
         return [];
      default:
         return state;
   }
}