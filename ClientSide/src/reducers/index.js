import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import Users from './Users';
import Errs from './Errs';
import Home from './Home';
import Token from './Token';

const rootReducer = combineReducers({
   Users, 
   Errs, 
   Home,
   Token
});
export default rootReducer;