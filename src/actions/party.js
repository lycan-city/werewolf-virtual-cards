import types from './types';
import Db from '../db';
import NavigationService from '../navigation';

const setParty = party => ({
  type: types.party.set,
  party,
});

const joinPartyFailed = partyId => ({
  type: types.alert.set,
  show: true,
  title: 'Join failed',
  message: `No party with id ${partyId}`,
});

export const flee = () => (dispatch, getState) => {
  const db = Db.get();
  const { party } = getState();

  NavigationService.navigate('Home');
  db.fleeParty(party);
  return setParty({});
};

export const clearAlert = () => ({
  type: types.alert.set,
  show: false,
  title: '',
  message: '',
});

export const createParty = () => async (dispatch, getState) => {
  const db = Db.get();
  const {
    user: { username },
  } = getState();

  const party = await db.createParty(`${username}'s party`, p => dispatch(setParty(p)));
  dispatch(setParty(party));
};

export const joinParty = partyId => async (dispatch, getState) => {
  const db = Db.get();
  let party = await db.getPartyById(partyId.toUpperCase().trim());

  if (!party) {
    dispatch(joinPartyFailed(partyId.toUpperCase().trim()));
    return;
  }

  const {
    user: { username },
  } = getState();

  party = await db.joinParty(party, username, p => dispatch(setParty(p)));
  dispatch(setParty(party));

  NavigationService.navigate('Lobby');
};
