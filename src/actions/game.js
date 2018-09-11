/* eslint-disable import/prefer-default-export */
import brain from 'werewolf-brain';
import types from './types';
import NavigationService from '../navigation';

const setGame = game => ({
  type: types.game.set,
  game,
});

export const createGame = () => (dispatch, getState) => {
  const {
    party: { players },
    settings,
  } = getState();

  const game = brain.getGame(Object.keys(players).length, settings);
  dispatch(setGame(game));
  NavigationService.navigate('Game');
};
