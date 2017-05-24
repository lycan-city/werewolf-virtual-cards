import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const user = createReducer({ id: null, name: null}, {
    [types.USER_INFO_UPDATED](state, action) {
        return Object.assign({}, state, action.user);
    }
}, null);
