//This file contains all the firebase related code
import { initializeApp } from 'firebase/app';
import { onAuthStateChanged,getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
    
  }
  catch (error) {
    console.log('Error creating user', error.message)
  }
}
//Sign in using email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  try {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
    ;
  }
  catch (error) {
    console.log('Error creating user', error.message)
  }
}
//Sign out user
export const signOutUser = async() => await signOut(auth);




//Convert collections snapshot to map
//Add collection and documents to firestore
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
//Create batch
  const batch = writeBatch(db);
//Loop through objects to add and create new document reference
  objectsToAdd.forEach(obj => {
    //Create new document reference
    //If we don't pass any argument to doc, it will create a new document with a unique id
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  })
  //Commit batch
  await batch.commit();
  console.log("Collection added")
}
//
//Get categories and documents from firestore
export const getCategoriesAndDocuments = async () => {
  //Get categories collection reference
  const collectionRef = collection(db, 'categories');
  //Get query snapshot
  const q = query(collectionRef);
  //Get documents from query snapshot
  const querySnapshot = await getDocs(q);
  //Create category map
  return querySnapshot.docs.map(docSnapShot => docSnapShot.data());
}

//Convert collections snapshot to map
export const convertCollectionsSnapshotToMap = (collections) => {
  //Get array of documents from collections
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      title,
      items,
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id
    }
  })
  //Convert array to object
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
}

//Check if user is signed in
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

export const getCurrentUser = () => {
 return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, 
      (userAuth) => {
      unsubscribe();
      resolve(userAuth);
    }, reject)
  })
}