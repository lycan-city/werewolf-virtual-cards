import firebase from 'firebase/app';
import 'firebase/firestore';
import { Constants } from 'expo';

import { firebase } from './app.config';
export default class Db {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.firestore();
    this.db.settings({
      timestampsInSnapshots: true,
    });
  }

  createParty(name) {
    return this.db.collection('parties').add({
      name,
      moderator: Constants.deviceId,
      createdAt: new Date(),
    });
  }
}
