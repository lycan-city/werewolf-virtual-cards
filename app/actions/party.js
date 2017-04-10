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

export function joinParty(id) {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'Party' }))
        const { user } = getState();
        Party.join({ id, user })
            .then(party => {
                dispatch(subscribeToParty(party))
                return party;
            })
            .then(party => dispatch(setPartyRecieved(party)))
            .catch(e => console.log(e));
    };
}

export function getPartyInfo() {
    return dispatch => {
        dispatch(NavigationActions.navigate({routeName: 'JoinParty'}));
    }
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

export function setUserJoined(joinedUser) {
    return (dispatch, getState) => {
        const { user } = getState();
        if(joinedUser.id === user.id)
            return;
        dispatch({
            type: types.USER_JOINED,
            user: joinedUser
        });
    }
}

export function setUserFled({id}) {
    return {
        type: types.USER_FLED,
        id
    };
}