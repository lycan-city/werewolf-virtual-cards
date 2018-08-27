/* eslint-disable import/prefer-default-export */

import types from './types';
import Db from '../db';
import NavigationService from '../navigation';

const noop = () => {};

let unsubscribeParty = noop;

export const setParty = party => ({
  type: types.party.set,
  party,
});

export const unsubscribe = () => {
  unsubscribeParty();
  unsubscribeParty = noop;
  return {
    type: types.party.set,
    party: {},
  };
};

export const setJoinPartyFailed = () => ({
  // TODO: Notify the error message
  type: types.party.failed,
});

export const joinParty = partyId => async (dispatch, getState) => {
  const db = Db.get();
  let party = await db.getPartyById(partyId.toUpperCase().trim());

  if (!party) {
    dispatch(setJoinPartyFailed());
  }

  const {
    user: { username },
  } = getState();

  party = await db.joinParty(party, username);
  dispatch(setParty(party));

  unsubscribeParty = db.subscribeToParty(partyId.toUpperCase(), p => dispatch(setParty(p)));
  NavigationService.navigate('Lobby');
};
