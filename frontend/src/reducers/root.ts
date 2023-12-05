import { combineReducers } from 'redux';
import userReducer from './user';
import errorReducer from './errors';
import opportunityReducer from './opportunities';

const RootReducer = combineReducers({
  userReducer,
  opportunityReducer,
  errorReducer,
});

export default RootReducer;
