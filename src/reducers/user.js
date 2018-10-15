import types from '../actions';

const defaultUser = {
  username: 'Guest',
};

const user = (state = defaultUser, action) => {
  switch (action.type) {
    case types.user.set.name:
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export default user;
