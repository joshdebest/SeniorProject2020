function Users(state = {}, action) {
   console.log("User reducing action " + action.type);
   switch(action.type) {
   case 'LOGIN':
      return action.user;
   case 'LOGOUT':
      return {}; // Clear user state
   case 'LOGIN_ERROR':
      return action;
   default:
      return state;
   }
}

export default Users;