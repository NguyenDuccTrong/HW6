import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';




const firebaseConfig = {
    apiKey: "AIzaSyAf-1TK4OjohMcLXeRj77hmaPDTJE1PYe8",
    authDomain: "facebookphake-d7e97.firebaseapp.com",
    projectId: "facebookphake-d7e97",
    storageBucket: "facebookphake-d7e97.appspot.com",
    messagingSenderId: "281926619919",
    appId: "1:281926619919:web:cd93cacf078098b662647a",
    measurementId: "G-2DMFNYLF5M"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export {db, auth, storage, provider}