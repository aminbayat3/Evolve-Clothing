import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

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

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //if user data does not exist
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  // whether user data exists or not
  //return userDocRef

  return userDocRef;
};
