import { combineReducers } from 'redux';
import opportunities from './opportunities';

const entities = combineReducers({
  opportunities,
});

export default entities;
