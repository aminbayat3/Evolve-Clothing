import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../component/sign-up-form/sign-up-form.component";

const SignIn = () => {

  const logGoogleUser = async () => {
    // const response = await signInWithGooglePopup();
    // console.log(response);
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in">
      <button onClick={logGoogleUser}> Sign in with Google Popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
