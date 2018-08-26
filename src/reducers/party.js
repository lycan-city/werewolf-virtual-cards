import types from '../actions';

const party = (state = {}, action) => {
  switch (action.type) {
    case types.party.set:
      return Object.assign({}, state, action.party);
    default:
      return state;
  }
};

export default party;
