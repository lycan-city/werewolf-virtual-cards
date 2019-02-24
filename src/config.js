/* eslint-disable import/no-extraneous-dependencies */
import {
  FIREBASE_API_KEY,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from 'react-native-dotenv';

export default {
  firebase: {
    apiKey: FIREBASE_API_KEY,
    databaseURL: FIREBASE_DATABASE_URL,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
  },
};
