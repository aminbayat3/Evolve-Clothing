import { createContext, useState, useEffect } from "react";
import { getDoc } from "firebase/firestore";

import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";

//
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const userDocRef = await createUserDocumentFromAuth(user);
        const userSnapshot = await getDoc(userDocRef);

        setCurrentUser({
          id: userSnapshot.id,
          ...userSnapshot.data(),
        });
      } else {
        setCurrentUser(user);
      }
    });
    

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
