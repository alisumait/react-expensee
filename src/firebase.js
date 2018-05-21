import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBZ0iMv0Hx9pGRLonPfJ3c4DAKZIBLoiZk",
    authDomain: "expensee-1bf50.firebaseapp.com",
    databaseURL: "https://expensee-1bf50.firebaseio.com",
    projectId: "expensee-1bf50",
    storageBucket: "expensee-1bf50.appspot.com",
    messagingSenderId: "111814420112"
  };

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;