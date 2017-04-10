import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const party = createReducer({}, {
    [types.PARTY_RECIEVED](state, action) {
        return Object.assign({}, state, action.party);
    },
    [types.USER_JOINED](state, action) {
        return Object.assign({}, state, {
            players: [...state.players, action.user ]
        });
    },
});
