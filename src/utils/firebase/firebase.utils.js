//This file contains all the firebase related code
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYIaoJpm3L000XetU4Nx7mXAzFFygH8Ak",
  authDomain: "crwn-clothing-db-1ce49.firebaseapp.com",
  projectId: "crwn-clothing-db-1ce49",
  storageBucket: "crwn-clothing-db-1ce49.appspot.com",
  messagingSenderId: "548758696644",
  appId: "1:548758696644:web:e2a4eb0cb4850d74018f91"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//Create user document in firestore
//firestore consists of collections and documents
//Additional information is an object that contains displayName
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  if (!userAuth) return;

  const userRef = doc(db, 'users', userAuth.uid);

  const userSnap = await getDoc(userRef);
//Check if user exists in firestore
  if (!userSnap?.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
//Create user in firestore
    try {
      //Additional information is an object that contains displayName
      //need to know about more about this line
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }
    catch (error) {
      console.log('Error creating user', error.message)
    }
  }
//Return userRef
  return userRef;



}

//Sign up using email and password
export const createUserWithEmailAndPasswordFirebase = async (email, password) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    return user;
  }
  catch (error) {
    console.log('Error creating user', error.message)
  }
}