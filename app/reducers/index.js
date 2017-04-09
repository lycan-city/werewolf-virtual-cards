import { combineReducers } from 'redux';
import * as PartyReducer from './party';
import * as NavigationReducer from './navigation';

export default combineReducers(Object.assign(
  PartyReducer,
  NavigationReducer,
));
