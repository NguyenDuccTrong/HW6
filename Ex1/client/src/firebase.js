import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAsRNpSaaAc4kHGLETtKiszigUeAmNHlCI",
  authDomain: "trongmouth.firebaseapp.com",
  projectId: "trongmouth",
  storageBucket: "trongmouth.appspot.com",
  messagingSenderId: "52960775425",
  appId: "1:52960775425:web:b1ea33535ed26263da1f00",
  measurementId: "G-NY8KZ2XKHG"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}