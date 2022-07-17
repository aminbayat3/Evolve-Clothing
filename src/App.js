import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";



import { getDoc } from "firebase/firestore";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import Navigation from "./routes/navigation/navigation.component";
import HomePage from "./routes/homepage/homepage.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import CheckoutPage from "./routes/checkout/checkout.component";
import { setCurrentUser } from "./store/user/user.action";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch(); // notice that we're using this dispatch inside of the useEffect and the dispatch itself is initialized outside, so react will give us a warning to use dispatch as a dependency althogh this dispatch never updates, so in general we can also ignore it and leave the dependency array empty

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      if (user) {
        const userDocRef = await createUserDocumentFromAuth(user);
        const userSnapshot = await getDoc(userDocRef);

        dispatch(setCurrentUser({
          id: userSnapshot.id,
          ...userSnapshot.data(),
        }));
      } else {
        dispatch(setCurrentUser(user)); // it will passes the action to every single reducer and that is its difference with context
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomePage />} />
          <Route path="shop/*" element={<Shop />} />
          <Route path="auth" element={<Authentication />} />
          <Route path="checkout" element={<CheckoutPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
