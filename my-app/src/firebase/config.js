import app from 'firebase/app';
import firebase from 'firebase';





app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
