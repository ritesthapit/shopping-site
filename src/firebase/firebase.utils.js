import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDV58TUtGg1Rtb6iKhpuqZoTNP5C9C0NsE",
  authDomain: "clothing-db-15b04.firebaseapp.com",
  projectId: "clothing-db-15b04",
  storageBucket: "clothing-db-15b04.appspot.com",
  messagingSenderId: "174672174773",
  appId: "1:174672174773:web:22c9242c67b371d355e8fc",
  measurementId: "G-0Y5DD96EXH"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

