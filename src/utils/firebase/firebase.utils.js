import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged                    //Observable listener
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-82rpgW4W8hK6kpkZHPIhtaausTwi0As",
  authDomain: "ecommerce-db-216e7.firebaseapp.com",
  projectId: "ecommerce-db-216e7",
  storageBucket: "ecommerce-db-216e7.appspot.com",
  messagingSenderId: "294928942920",
  appId: "1:294928942920:web:1ebe794630a4fadd67957d",
  measurementId: "G-WECCGEXCZP",
};

const firebaseapp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider(); // this provider is only for Google but we can also use FacebookProvider as well
googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field = 'title') => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase()); //object.title.toLowerCase() we did that because we wanted our code to be generic.
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {IMPORTANT**:  this logic should be in a selector when we're using a Redux. this way we have access to the whole data and then we modify it in a selector based on what we need.
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // return categoryMap;
  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //if user data does not exist
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // whether user data exists or not
  //return userDocRef

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  return await signOut(auth);
}

export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);  //an open listener like someone who is standing there and trying to listen for changes so when the component unmounts we need to tell it stop listening
} 
 // onAuthStateChanged(auth, callback, errorCallback, completedCallback)
// completedCallback => is when the listener completed

// next : callback
// error: errorCallback
//complete: completedCallback