import types from '../actions';

const defaultParty = { gameInProgress: false };

const party = (state = defaultParty, action) => {
  switch (action.type) {
    case types.party.set:
      return action.party;
    default:
      return state;
  }
};

export default party;
