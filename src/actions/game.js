/* eslint-disable import/prefer-default-export */
import brain from 'werewolf-brain';
import types from './types';
import NavigationService from '../navigation';

const setGame = game => ({
  type: types.game.set,
  game,
});

const assignCardsToPlayers = (deck, players) => {
  const cards = [].concat(
    ...deck.map((c) => {
      const deckCards = [];
      for (let i = 0; i < c.amount; i += 1) {
        deckCards.push({
          description: c.description,
          key: c.key,
          role: c.role,
        });
      }
      return deckCards;
    })
  );

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return Object.assign({}, ...Object.keys(players).map(k => ({ [k]: cards.pop() })));
};

export const createGame = () => (dispatch, getState) => {
  const {
    party: { players },
    settings,
  } = getState();

  const game = brain.getGame(Object.keys(players).length, settings);
  const playersWithCards = assignCardsToPlayers(game.deck, players);
  dispatch(setGame(game));
  NavigationService.navigate('Game');
};
