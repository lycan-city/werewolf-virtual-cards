/* eslint-disable import/prefer-default-export */
import types from './types';
import NavigationService from '../navigation';

const setSettings = settings => ({
  type: types.settings.set,
  settings,
});

export const prepareGame = settings => (dispatch) => {
  dispatch(setSettings(settings));
  NavigationService.navigate('Lobby');
};
