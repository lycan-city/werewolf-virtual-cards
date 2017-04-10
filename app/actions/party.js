import * as types from './types';
import Party from '../services/party';
import { NavigationActions } from 'react-navigation';

export function hostParty() {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'Party' }))
        const user = getState().user;
        Party.host(user)
            .then(party => {
                dispatch(subscribeToParty(party))
                return party;
            })
            .then(party => dispatch(setPartyRecieved(party)))
            .catch(e => console.log(e));
    };
}

export function setPartyRecieved(party) {
    return {
        type: types.PARTY_RECIEVED,
        party: party
    };
}

export function subscribeToParty({id}) {
    return (dispatch, getState) => {
        Party.subscribe(
            id,
            user => dispatch(setUserJoined(user)),
            userId => dispatch(setUserFled(userId))
        );
    };
}

export function setUserJoined(user) {
    return {
        type: types.USER_JOINED,
        user
    };
}

export function setUserFled({id}) {
    return {
        type: types.USER_FLED,
        id
    };
}