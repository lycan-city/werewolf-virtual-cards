import { combineReducers } from 'redux';
import user from './user';
import party from './party';
import alert from './alert';
import settings from './settings';
import game from './game';
import gamePrep from './gamePrep';

export default combineReducers({
  user,
  party,
  alert,
  settings,
  game,
  gamePrep,
});
