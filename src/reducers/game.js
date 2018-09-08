import types from '../actions';

const game = (state = {}, action) => {
  switch (action.type) {
    case types.game.set:
      return action.settings;
    default:
      return state;
  }
};

export default game;
