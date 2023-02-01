import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, //Observable listener
  NextOrObserver,
  User,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
  QueryDocumentSnapshot
} from "firebase/firestore";

import { Category } from "../../store/categories/categories.type";

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
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export type ObjectTodAdd = {
  title: string;
};

export const addCollectionAndDocuments = async <T extends ObjectTodAdd>(
  collectionKey: string,
  objectsToAdd: T[],
): Promise<void> => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase()); //object.title.toLowerCase() we did that because we wanted our code to be generic.
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async (): Promise<Category[]> => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  // await Promise.reject(new Error('new error woops!'))
  const querySnapshot = await getDocs(q);
  // const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {IMPORTANT**:  this logic should be in a selector when we're using a Redux. this way we have access to the whole data and then we modify it in a selector based on what we need.
  //   const { title, items } = docSnapshot.data();
  //   acc[title.toLowerCase()] = items;
  //   return acc;
  // }, {});
  // return categoryMap;
  return querySnapshot.docs.map((docSnapshot) => docSnapshot.data() as Category);
};

export type AdditionalData = { // we can ofcourse have another file for these types
  displayName?: string;
}

export type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
}

export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalData = {} as AdditionalData
): Promise<void | QueryDocumentSnapshot<UserData>> => { // because of this line, this function may resolve to undefined
  if (!userAuth) return; 
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  //if user data does not exist
  //create / set the document with the data from userAuth in my collection
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) { // or we could just log the error itself and not the message
      let message: string;
      error instanceof Error ? (message = error.message) : (message = String(error));
      console.log("error creating the user", message);
    }
  }

  // whether user data exists or not
  //return userDocRef

  // return userDocRef;
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) => {
  return onAuthStateChanged(auth, callback); //an open listener like someone who is standing there and trying to listen for changes so when the component unmounts we need to tell it stop listening
};
// onAuthStateChanged(auth, callback, errorCallback, completedCallback)
// completedCallback => is when the listener completed

// next : callback
// error: errorCallback
//complete: completedCallback

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth); // this listener is asynchronous so we're gonna resolve the moment we get the the userAuth anyway
      },
      reject
    ); //we dont want this listener just stay active, so we wanna unsubscribe the moment we get a value. if we dont do this there will be a memory leak
  });
};
