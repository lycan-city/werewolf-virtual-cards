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
  }

  async createParty(name) {
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

  async joinParty(party) {
    const { deviceId } = Constants;
    const joinedAt = Date.now();
    const updatedParty = {
      ...party,
      players: {
        ...party.players,
        [deviceId]: { joinedAt },
      },
    };

    await this.db
      .collection('parties')
      .doc(party.id)
      .set(updatedParty);
    return updatedParty;
  }

  subscribeToParty(id, callback) {
    this.db
      .collection('parties')
      .doc(id)
      .onSnapshot((d) => {
        callback(d.data());
      });
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
