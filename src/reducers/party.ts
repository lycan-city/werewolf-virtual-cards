import createReducer from '../lib/createReducer';
import { ActionTypes } from '../actions/types';
import _ from 'lodash';

export const party = createReducer({}, {
    [ActionTypes.PARTY_RECIEVED](state, action) {
        return Object.assign({}, state, action.party);
    },
    [ActionTypes.USER_JOINED](state, action) {
        return Object.assign({}, state, {
            players: [...state.players, action.user]
        });
    },
    [ActionTypes.USER_FLED](state, action) {
        const fleeingIndex = _.findIndex(state.players, p => p.id === action.id);
        return Object.assign({}, state, {
            players: [
                ...state.players.slice(0, fleeingIndex),
                ...state.players.slice(fleeingIndex + 1)
            ]
        });
    }
}, null);
