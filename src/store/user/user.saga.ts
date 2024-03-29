import { takeLatest, put, call, all } from "typed-redux-saga/macro";
import { User } from "firebase/auth";

import { USER_ACTIONS_TYPES } from "./user.types";
import { AdditionalData } from "../../utils/firebase/firebase.utils";

import {
  signInSuccess,
  signInFailed,
  signUpSuccess,
  signUpFailed,
  signOutSuccess,
  signOutFailed,
  EmailSignInStart,
  SignUpStart,
  SignUpSuccess,
} from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  createAuthUserWithEmailAndPassword,
  signOutUser
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalData) {
  try {
    const userSnapshot = yield* call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );

    if(userSnapshot){
      yield* put(
        signInSuccess({
          id: userSnapshot.id,
          ...userSnapshot.data(),
        })
      );
    }
    
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({ payload: { email, password }}: EmailSignInStart) {
  // remember we have access to the action itself as well
  try {
    const userCredentials = yield* call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCredentials) {
      const { user } = userCredentials;
      yield* call(getSnapshotFromUserAuth, user); 
    }
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser);
    if (!userAuth) return;
    yield* call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield* put(signInFailed(error as Error));
  }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart) {
  try {
    const userCredentials = yield* call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if(userCredentials) {
      const { user } = userCredentials;
      yield* put(signUpSuccess(user, { displayName }));
    }
    
  } catch (error) {
    yield* put(signUpFailed(error as Error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
  yield* call(getSnapshotFromUserAuth, user, additionalDetails);
}

export function* signOut() {
    try {
        yield* call(signOutUser);
        yield* put(signOutSuccess());
    } catch(error) {
        yield* put(signOutFailed(error as Error));
    }
}

export function* onGoogleSignInStart() {
  yield* takeLatest(USER_ACTIONS_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onCheckUserSession() {
  yield* takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignInStart() {
  yield* takeLatest(USER_ACTIONS_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignUpStart() {
  yield* takeLatest(USER_ACTIONS_TYPES.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield* takeLatest(USER_ACTIONS_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield* takeLatest(USER_ACTIONS_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onSignUpSuccess),
    call(onSignOutStart),
  ]);
}
