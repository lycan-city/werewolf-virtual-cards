import brain from 'werewolf-brain';
import types from './types';
import NavigationService from '../navigation';
import Db from '../db';

const setGamePrep = game => ({
  type: types.gamePrep.set,
  game,
});

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
          url: c.url,
        });
      }
      return deckCards;
    })
  );

  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return Object.assign(
    {},
    ...Object.keys(players).map(k => ({ [k]: { card: cards.pop(), alive: true } }))
  );
};

export const createGame = () => async (dispatch, getState) => {
  const {
    party: { id, players },
    settings,
  } = getState();
  const db = Db.get();

  const game = brain.getGame(Object.keys(players).length, settings);

  const deckWithUrl = await Promise.all(
    game.deck.map(async r => ({
      ...r,
      url: await db.getCardUrl(r.key),
    }))
  );

  const playersWithCards = assignCardsToPlayers(deckWithUrl, players);

  dispatch(
    setGamePrep(
      Object.assign({}, game, {
        deck: playersWithCards,
        screenplay: brain.getScriptFromDeck(game.deck, settings.language),
      })
    )
  );

  await db.createGame(id, playersWithCards, g => dispatch(setGame(g)));
  NavigationService.navigate('Game');
};

export const joinGame = id => async (dispatch) => {
  const db = Db.get();
  await db.joinGame(id, g => dispatch(setGame(g)));
  NavigationService.navigate('Card');
};
