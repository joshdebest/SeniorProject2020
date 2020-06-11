export default function Users(state = {}, action) {
   console.log("User reducing action " + action.type);
   switch(action.type) {
      case 'LOGIN':
         return action.user;
      case 'SIGNUP':
         return action.user;
      case 'LOGOUT':
         return {}; // Clear user state
      case 'LOGIN_ERROR':
         return action;
      case 'UPDATE_USERS':
         return action.users;
      default:
         return state;
   }
}
