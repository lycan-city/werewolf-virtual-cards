import { combineReducers } from 'redux';
import * as counterReducer from './counter'
import * as PartyReducer from './party';
import * as NavigationReducer from './navigation';

export default combineReducers(Object.assign(
  counterReducer,
  PartyReducer,
  NavigationReducer
));
