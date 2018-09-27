/* eslint-disable import/prefer-default-export */
import types from './types';

export const setUsername = username => ({
  type: types.user.set.name,
  username,
});
