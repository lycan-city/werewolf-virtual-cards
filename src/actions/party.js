import types from './types';
import Db from '../db';
import NavigationService from '../navigation';
import { joinGame } from './game';

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
  const party = await db.getPartyById(partyId.toUpperCase().trim());

  if (!party) {
    dispatch(joinPartyFailed(partyId.toUpperCase().trim()));
    return;
  }

  const {
    user: { username },
  } = getState();

  const player = await db.joinParty(party.id, username, (p) => {
    const {
      party: { gameInProgress },
    } = getState();

    if (gameInProgress !== p.gameInProgress) {
      if (p.gameInProgress) {
        dispatch(joinGame(p.id));
      } else {
        NavigationService.navigate('Lobby');
      }
    }
    dispatch(setParty(p));
  });
  dispatch(setParty({ ...party, players: Object.assign({}, party.players, player) }));

  NavigationService.navigate('Lobby');
};
