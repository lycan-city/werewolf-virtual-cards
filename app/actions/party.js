import * as types from './types';
import Party from '../services/party';
import { NavigationActions } from 'react-navigation';

export function hostParty() {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'Party' }))
        Party.host()
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