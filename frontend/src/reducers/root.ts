import { combineReducers } from 'redux';
import user from './user';
import errors from './errors';
import entities from './entities';

const RootReducer = combineReducers({
  user,
  entities,
  errors,
});

export default RootReducer;
