import firebase from 'firebase/app';
import 'firebase/firestore';
import { Constants } from 'expo';

import envVars from './.env.json';

let instance = null;
class Db {
  constructor() {
    firebase.initializeApp(envVars.firebase);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true,
    });
    const noop = () => {};
    this.unsubscribeParty = noop;
  }

  subscribeParty(id, callback) {
    return this.db
      .collection('parties')
      .doc(id)
      .onSnapshot((d) => {
        callback(d.data());
      });
  }

  async createParty(name, callback) {
    const createdAt = new Date();

    const id = (createdAt.getTime() % (1000 * 60 * 60 * 24)).toString(36).toUpperCase();

    const party = {
      id,
      name,
      moderator: Constants.deviceId,
      createdAt,
      players: {},
    };

    await this.db
      .collection('parties')
      .doc(id)
      .set(party);

    this.unsubscribeParty = this.subscribeParty(party.id, callback);

    return party;
  }

  async getPartyById(id) {
    return this.db
      .collection('parties')
      .doc(id)
      .get()
      .then(ref => ref.data())
      .catch(() => null);
  }

  async joinParty(party, name, callback) {
    const { deviceId } = Constants;
    const joinedAt = Date.now();
    const updatedParty = {
      ...party,
      players: {
        ...party.players,
        [deviceId]: { joinedAt, name },
      },
    };

    await this.db
      .collection('parties')
      .doc(party.id)
      .set(updatedParty);

    this.unsubscribeParty = this.subscribeParty(party.id, callback);

    return updatedParty;
  }

  async fleeParty(party) {
    const { deviceId } = Constants;
    const { [deviceId]: playerToRemove, ...updatedPlayers } = party.players;
    const updatedParty = {
      ...party,
      players: updatedPlayers,
    };

    await this.db
      .collection('parties')
      .doc(party.id)
      .set(updatedParty);

    this.unsubscribeParty();
    this.unsubscribeParty = this.noop;

    return updatedParty;
  }
}

export default {
  get: () => {
    if (!instance) {
      instance = new Db();
    }

    return instance;
  },
};
