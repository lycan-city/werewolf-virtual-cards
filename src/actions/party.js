/* eslint-disable import/prefer-default-export */

import types from './types';
import Db from '../db';
import NavigationService from '../navigation';

const noop = () => {};

let unsubscribeParty = noop;

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

export const unsubscribe = () => {
  unsubscribeParty();
  unsubscribeParty = noop;
  return {
    type: types.party.set,
    party: {},
  };
};

export const clearAlert = () => ({
  type: types.alert.set,
  show: false,
  title: '',
  message: '',
});

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

  party = await db.joinParty(party, username);
  dispatch(setParty(party));

  unsubscribeParty = db.subscribeToParty(partyId.toUpperCase().trim(), p => dispatch(setParty(p)));
  NavigationService.navigate('Lobby');
};
