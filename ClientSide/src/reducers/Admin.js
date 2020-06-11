export default function Admin(state = {}, action) {
   console.log("Admin reducing action " + action.type);
   switch(action.type) {
      case 'UPDATE_USER':
         return state.map(val => Object.assign({}, val,
            { firstName: action.data.firstName,
              lastName: action.data.lastName,
              password: action.data.password,
              grade: action.data.grade,
              role: action.data.role
            }));
      case 'CREATE_USER':
         return state.concat([action.usr]); // Clear user state
      case 'DELETE_USER':
         return state.filter(x => x.id !== action.usr);
      default:
         return state;
   }
}