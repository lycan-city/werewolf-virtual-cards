import firebase from 'firebase/app';
import 'firebase/firestore';
import { Constants } from 'expo';

import envVars from './.env.json';
export default class Db {
  constructor() {
    firebase.initializeApp(envVars.firebase);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  createParty(name) {
    const createdAt = new Date();
    const slug = createdAt
      .getTime()
      .toString(32)
      .toUpperCase();

    return this.db.collection('parties').add({
      name,
      moderator: Constants.deviceId,
      createdAt,
      slug,
    });
  }
}
