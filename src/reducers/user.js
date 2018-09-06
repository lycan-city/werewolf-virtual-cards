import types from '../actions';

const defaultUser = {
  attributes: { moderator: false },
};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case types.user.set.name:
      return { ...state, username: action.username };
    case types.user.set.as.moderator:
      return {
        ...state,
        username: action.username,
        attributes: { ...state.attributes, moderator: true },
      };
    default:
      return state;
  }
};

export default user;
