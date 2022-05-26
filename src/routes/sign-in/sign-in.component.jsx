import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    //when signInWithGoogleRedirect fires our sign in component will remounts and when it does we want to get the response only one time
    (async () => {
        const response = await getRedirectResult(auth); // get me the response for the redirect that just happened(and it knows when it redirected via this auth(this auth is tracking all of the authentications state))
        if(response) {
            const userDocRef = await createUserDocumentFromAuth(response.user);
            console.log(userDocRef);
        }
    })();
  }, []);

  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  // const logGoogleRedirect = async () => { //we cannot do the same for GoogleRedirect
  //     const { user } = await signInWithGoogleRedirect();
  //     console.log(user);
  // }
  return (
    <div className="sign-in">
      <button onClick={logGoogleUser}> Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};

export default SignIn;
