import { combineReducers } from 'redux';
import user from './user';
import errorReducer from './errors';
import opportunityReducer from './opportunities';

const RootReducer = combineReducers({
  user,
  opportunityReducer,
  errorReducer,
});

export default RootReducer;
