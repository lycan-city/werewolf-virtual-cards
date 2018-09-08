import brain from 'werewolf-brain';
import types from '../actions';

const defaultSettings = {
  deckName: 'basic',
  language: 'en',
  mode: 'normal',
  deck: brain.getDecks().basic,
};

const settings = (state = defaultSettings, action) => {
  switch (action.type) {
    case types.settings.set:
      return action.settings;
    default:
      return state;
  }
};

export default settings;
