import{ getApp, getApps , initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getStorage  } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDv6bnDHuV2GzMcGI6TpD2ZvNVQ2YZC4Pc",
    authDomain: "dropboxnextjs.firebaseapp.com",
    projectId: "dropboxnextjs",
    storageBucket: "dropboxnextjs.appspot.com",
    messagingSenderId: "296918373651",
    appId: "1:296918373651:web:d7c60089b3aa95633f36e6",
    measurementId: "G-087J3JBZPE"
  };

  const app = getApps().length ? getApp() :initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);

  export { db , storage}