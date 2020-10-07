import * as firebase from 'firebase';

import "firebase/auth";
import "firebase/firestore";
//import "firebase/functions";
import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD3V7UdfJ8VMvpCMGQbzCitzExaZMPJ1S4",
  authDomain: "game-case-ed16c.firebaseapp.com",
  databaseURL: "https://game-case-ed16c.firebaseio.com",
  projectId: "game-case-ed16c",
  storageBucket: "game-case-ed16c.appspot.com",
  messagingSenderId: "933591247193",
  appId: "1:933591247193:web:b908f468f734e658f60448",
  measurementId: "G-Q9TNH2TS69"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const firestore = firebase.firestore();
export const storage = firebase.storage();