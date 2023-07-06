import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCAjQoogmvh41sP9tz3yZn0c7HFyZMz-R8",
  authDomain: "olx-clone-d7fcd.firebaseapp.com",
  projectId: "olx-clone-d7fcd",
  storageBucket: "olx-clone-d7fcd.appspot.com",
  messagingSenderId: "996704063816",
  appId: "1:996704063816:web:23d548eda5144227f6237d",
  measurementId: "G-1STEN2EZKH"
};



// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const auth = getAuth(firebase)
const storage = getStorage(firebase)


export { firebase, firestore, auth, storage }