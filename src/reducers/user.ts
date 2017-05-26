import createReducer from '../lib/createReducer';
import { ActionTypes } from '../actions/types';

export const user = createReducer({ id: null, name: null }, {
    [ActionTypes.USER_INFO_UPDATED](state, action) {
        return Object.assign({}, state, action.user);
    }
}, null);
