import { combineReducers } from 'redux';
import userReducer from './user';
import opportunityReducer from './opportunities';

const RootReducer = combineReducers({
  userReducer,
  opportunityReducer,
});

export default RootReducer;
