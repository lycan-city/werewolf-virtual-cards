/* eslint-disable import/prefer-default-export */
import types from './types';
import NavigationService from '../navigation';

const setGame = settings => ({
  type: types.game.set,
  settings,
});

export const prepareGame = settings => (dispatch) => {
  dispatch(setGame(settings));
  NavigationService.navigate('Lobby');
};
