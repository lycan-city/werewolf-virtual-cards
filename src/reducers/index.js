import { combineReducers } from 'redux';
import user from './user';
import party from './party';
import alert from './alert';
import game from './game';

export default combineReducers({
  user,
  party,
  alert,
  game,
});
