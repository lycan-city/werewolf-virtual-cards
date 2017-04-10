import { combineReducers } from 'redux';
import * as PartyReducer from './party';
import * as NavigationReducer from './navigation';
import * as UserReducer from './user';

export default combineReducers(Object.assign(
  PartyReducer,
  NavigationReducer,
  UserReducer
));
