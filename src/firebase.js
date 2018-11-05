import firebase from 'firebase';

const config = {
    
    // Firebase API Keys
    
  };

firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();

export default firebase;