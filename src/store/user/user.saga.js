import { takeLatest, put, call, all } from 'redux-saga/effects';

import { USER_ACTIONS_TYPES } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import { getCurrentUser } from '../../utils/firebase/firebase.utils';


export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        
    } catch(eor) {
        console.log(error);
    }
}

export function* onCheckUserSession {
    yield takeLatest(USER_ACTIONS_TYPES.CHECK_USER_SESSION)
}

// export function* userSagas() {
//     yield all([call()])
// }