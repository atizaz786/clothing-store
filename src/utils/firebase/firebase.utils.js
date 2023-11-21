import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userRef = doc(db, 'users', userAuth.uid);

  const userSnap = await getDoc(userRef);

  if (!userSnap?.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt
      })
    }
    catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef;



}