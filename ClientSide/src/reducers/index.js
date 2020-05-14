import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import Users from './Users';
import Errs from './Errs';
import Home from './Home'

const rootReducer = combineReducers({
   Users, 
   Errs, 
   Home,
   router: routerReducer
});
export default rootReducer;