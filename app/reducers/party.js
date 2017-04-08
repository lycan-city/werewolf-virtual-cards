import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const party = createReducer({}, {
    [types.HOST_PARTY](state, action) {
        return state;
    }
});
