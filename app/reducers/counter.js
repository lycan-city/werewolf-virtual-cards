import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const counter = createReducer(0, {
    [types.INCREMENT_COUNTER](state, action) {
        return state + 1
    }
});
