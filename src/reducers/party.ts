import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import _ from 'lodash';

export const party = createReducer({}, {
    [types.PARTY_RECIEVED](state, action) {
        return Object.assign({}, state, action.party);
    },
    [types.USER_JOINED](state, action) {
        return Object.assign({}, state, {
            players: [...state.players, action.user ]
        });
    },
    [types.USER_FLED](state, action) {
        const fleeingIndex = _.findIndex(state.players, p => p.id === action.id);
        return Object.assign({}, state, {
            players: [
                ...state.players.slice(0, fleeingIndex),
                ...state.players.slice(fleeingIndex + 1)
            ]
        });
    }
}, null);
