import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { connectRouter } from 'connected-react-router'


import Users from './reducers/Users';
import Errs from './reducers/Errs';
import Home from './reducers/Home';

const rootReducer = (history) => combineReducers({
   Users, 
   Errs, 
   Home,
   router: connectRouter(history)
});
export default rootReducer;