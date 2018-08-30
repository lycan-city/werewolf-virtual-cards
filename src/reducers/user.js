import types from '../actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case types.user.set.name:
      return { ...state, username: action.username };
    default:
      return state;
  }
};

export default user;
