import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Users from './Users';
import Errs from './Errs';
import Home from './Home';
import Admin from './Admin';

const rootReducer = combineReducers({
   Users, 
   Errs, 
   Home,
   Admin
});
export default rootReducer;