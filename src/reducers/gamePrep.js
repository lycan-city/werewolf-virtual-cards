import types from '../actions';

const gamePrep = (state = {}, action) => {
  switch (action.type) {
    case types.gamePrep.set:
      return action.game;
    default:
      return state;
  }
};

export default gamePrep;
