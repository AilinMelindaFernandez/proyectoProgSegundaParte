import app from 'firebase/app';
import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyBWj-sm9KYtoFd107fscxHNNnQhhsC69zs",
    authDomain: "proyectoprog-7b763.firebaseapp.com",
    projectId: "proyectoprog-7b763",
    storageBucket: "proyectoprog-7b763.appspot.com",
    messagingSenderId: "1063601823823",
    appId: "1:1063601823823:web:ec60173d1b80ac214b8a3a"
  };


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
