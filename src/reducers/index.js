import { combineReducers } from 'redux';
import user from './user';
import party from './party';

export default combineReducers({
  user,
  party,
});
