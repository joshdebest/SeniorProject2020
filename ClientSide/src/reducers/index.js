import { combineReducers } from 'redux';
import Users from './Users';
import Errs from './Errs';

const rootReducer = combineReducers({Users, Errs});
export default rootReducer;