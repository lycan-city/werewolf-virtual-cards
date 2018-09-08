import types from './types';

export const setUsername = username => ({
  type: types.user.set.name,
  username,
});

export const setModerator = username => ({
  type: types.user.set.as.moderator,
  username,
});
