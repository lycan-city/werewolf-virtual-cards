import { combineReducers } from 'redux';
import user from './user';
import party from './party';
import alert from './alert';
import settings from './settings';

export default combineReducers({
  user,
  party,
  alert,
  settings,
});
