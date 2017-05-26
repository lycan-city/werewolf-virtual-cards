import { ActionTypes } from './types';
import Party from '../services/party';
import { NavigationActions } from 'react-navigation';

const makeAction = (type: string, ...params) => {
    return {
        type: ActionTypes[type],
        ...params
    }
}

export const hostParty = () => {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'Party' }))
        const user = getState().user;
        Party.host(user)
            .then(party => {
                dispatch(this.subscribeToParty(party))
                return party;
            })
            .then(party => dispatch(this.setPartyRecieved(party)))
            .catch(e => console.log(e));
    };
}

const subscribeToParty = ({ id }) => {
    return (dispatch) => {
        Party.subscribe(id,
            user => dispatch(this.setUserJoined(user)),
            id => dispatch(makeAction(ActionTypes.USER_FLED, id)),
            id => dispatch(makeAction(ActionTypes.USER_KICKED, id)),
            id => dispatch(makeAction(ActionTypes.USER_PROMOTE, id))
        );
    };
};

export const joinParty = (id) => {
    return (dispatch, getState) => {
        dispatch(NavigationActions.navigate({ routeName: 'Party' }))
        const { user } = getState();
        Party.join({ id, user })
            .then(party => {
                dispatch(subscribeToParty(party))
                return party;
            })
            .then(party =>
                dispatch(makeAction(ActionTypes.PARTY_RECIEVED, party)))
            .catch(e => console.log(e));
    };
}

export const getPartyInfo = () => {
    return dispatch => {
        dispatch(NavigationActions.navigate({ routeName: 'JoinParty' }));
    }
}

export const kickPlayer = (id) => {
    return getState => {
        const { user, party } = getState();

        Party.kickPlayer({
            curentPartyId: party.id,
            kickedId: id,
            currentUserId: user.id
        });
    }
}

export const promotePlayer = (id) => {
    return getState => {
        const { user, party } = getState();

        Party.promotePlayer({
            curentPartyId: party.id,
            kickedId: id,
            currentUserId: user.id
        });
    }
};
